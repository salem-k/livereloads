import {Injectable} from "@angular/core";
import {HTTP} from "@ionic-native/http/ngx";
//import {SharedDataService} from "../shared-data/shared-data.service";
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {environment} from "../../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
    providedIn: "root"
})
export class LinkedinServiceService {
    cookies: any;
    li_at: any = localStorage.getItem('li_at');
    csrf: any = localStorage.getItem('csrf');
    jsessionid: any;
    networks;
    networks_per_public_id;

    //Search LinkedIn
    backgroundMode
    nbrRequestCommonContacts
    nbrRequestCommonContactsDone
    searchInProgress
    lastLunched
    msgErrorDoSearchShown = false

    // Search hits consts
    // LinkedIn searches display a max of 100 results pages
    // 3 recherches simultanées
    // Default MAX pages / recherche : 33
    MAX_SEARCH_PAGES_PER_DAY = 100;
    DEFAULT_MAX_PAGES_PER_SEARCH_PER_DAY = 33;

    // Search hits data
    searchHitsRequestsHistory: any;
    searchHitsPerSearchHistory: any;
    searchHitsRequestsHistoryIsDirty: boolean = true;
    searchHitsRequestsIntervals: any;

    constructor(
        private httpNative: HTTP,
        //private sharedData: SharedDataService,
        private alertCtrl: AlertController,
        private router: Router,
        private http: HttpClient,
    ) {
        this.removeSearchHitsRequestOlderThan24Hours();
        this.searchHitsRequestsIntervals = {};
    }


    /* **************************** */
    /* GENERIC/DEFAULT DATA METHODS */
    /* **************************** */


    /* Get the default headers used for every request to LinkedIn */
    getHeader() {
        return {
            "authority": "www.linkedin.com",
            "pragma": "no-cache",
            "cache-control": "no-cache",
            "x-restli-protocol-version": "2.0.0",
            "x-li-lang": "fr_FR",
            "user-agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.61 Safari/537.36",
            "x-li-page-instance":
                "urn:li:page:d_flagship3_feed;08xN1YE2TbCa4GMAi4AhJw==",

            "x-li-deco-include-micro-schema": "true",
            "csrf-token": this.csrf,
            "x-li-track":
                '{"clientVersion":"1.2.6216","osName":"web","timezoneOffset":10,"deviceFormFactor":"DESKTOP","mpName":"voyager-web"}',

            "sec-fetch-site": "same-origin",
            "sec-fetch-mode": "cors",
            "sec-fetch-dest": "empty",
            "referer": "https://www.linkedin.com/feed/",
            "accept-language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
            "accept": "application/vnd.linkedin.normalized+json+2.1",
            "cookie":
                "li_at=" +
                this.li_at +
                "; bcookie=v=2&4d73855a-a1bb-4dc7-836f-52de93ded925; bscookie=v=1&201909060944169e4910cc-d138-4cd8-8b56-a381ed3b1b7cAQFvRc9qOL8rWWGhqMODQ0XHljgh8Ler; visit=v=1&M; " +
                'JSESSIONID="' + localStorage.getItem("csrf") + '"' +
                '; liap=true; PLAY_LANG=fr; sl=v=1&iX3vS; ; lang=v=2&lang=fr-fr; PLAY_SESSION=eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjp7InNlc3Npb25faWQiOiI3MDI1ODhiNC1hMGQzLTQ1YzEtYTAyMi0zMGZmMmU3OTI5ZTd8MTU5MTY5ODMyMiIsInJlY2VudGx5LXNlYXJjaGVkIjoiIiwicmVmZXJyYWwtdXJsIjoiaHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8iLCJhaWQiOiIiLCJSTlQtaWQiOiJ8MCIsInJlY2VudGx5LXZpZXdlZCI6IjMwNjUiLCJDUFQtaWQiOiJaV05sWWpjek1qTXRZalF5TUMwME5ESTJMVGxoWmprdFlqUmlPVE5pWTJJMU0yWXoiLCJmbG93VHJhY2tpbmdJZCI6IlNadnR6dm5nUk5pMXlFdVZ6TjdVTkE9PSIsImV4cGVyaWVuY2UiOiJlbnRpdHkiLCJpc19uYXRpdmUiOiJmYWxzZSIsIndoaXRlbGlzdCI6Int9IiwidHJrIjoiIn0sIm5iZiI6MTU5MTc3MzI0NCwiaWF0IjoxNTkxNzczMjQ0fQ.we5T5pmedOdrG31wy2mb4rExQc3pE_kes9aRDv7NZAM; sdsc=22%3A1%2C1591797299107%7ECAOR%2C0AvZ3wwmcJdCWa55SgZeN%2BfL%2F%2BQI%3D; UserMatchHistory=AQKosX1KXo_8sAAAAXKyv0GYGHJkAUtIgnwjvJ3uQcxpOtPRiOXOt8x4w4ktJxD_nDo6Z2k1awVVmAOH-lWC00MYIN_hFU71rLnY-3g; li_oatml=AQEv0iLYrGXZFQAAAXKyv0JszTUBsXkYRH-JvINeGjF5vFyaOSFooAtg9xy2oudOGLrfc6iFhKelPdKXaPAo-q-lRYjuu4Ea; lidc="b=VB00:g=5183:u=1179:i=1592307792:t=1592346120:s=AQGbZdmZ2HIOSVrT9dAqaDqu0IMYXjN-"; _gat=1'
        };
    }

    /* Check we didn't hit a too many requests http error recently */
    gotTooManyRequestsErrorRecently() {
        let too_many_requests_timestamp = localStorage.getItem('too_many_requests_timestamp');

        if( ! too_many_requests_timestamp ) {
            return false;
        }

        let now_ts = Math.floor(Date.now() / 1000);
        let request_timestamp = parseInt(too_many_requests_timestamp);

        let seconds_diff = now_ts - request_timestamp;
        let hours_diff = seconds_diff / 3600;

        if( hours_diff >= 24 ) {
            localStorage.removeItem('too_many_requests_timestamp');
            return false;
        }

        return true;

        console.log('Got Too Many Requests recently. Aborting Lkd Request');
    }

    /* Send a log of a particular linked in request to #bugs channel in Slack */
    logLkdRequestToSlack(method, request_url) {
        // let hook_url = 'https://hooks.slack.com/services/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';

        // let gsh_requests_history = this.getSearchHitsRequestsHistory();
        // let num_requests = 0;

        // for(let i in gsh_requests_history) {
        //     num_requests += gsh_requests_history[i].requests_history.length
        // }

        // let slack_message = {
        //     text: "METHOD: " + method + "\n" +
        //             "ACCOUNT: " + localStorage.getItem('username') + "\n" +
        //             "LKD REQUEST URL: " + request_url + 
        //             "INCREMENTAL NUM REQUESTS IN 24H: " + num_requests
        // };

        // this.httpNative.setDataSerializer("json");

        // this.httpNative.post(hook_url, slack_message, { 'Content-Type': 'application/json' }).then(
        //     (res: any) => { },
        //     (err: any) => { console.log("logLkdRequestToSlack ERROR", err); }
        // );
    }

    /* Transforms a JS object into an URL friendly string.
     * {id: 2, name: "Patrick Duffy"}  =>  "id=2&name=Patrick%20Duffy"
     */
    objectToQueryString(obj) {
        return Object.keys(obj)
                    .map(key => `${key}=${encodeURI(obj[key])}`)
                    .join('&');
    }


    /* Extract the number of relations in a string following the next format:
     * "12 contacts in common" or "1 contact en commun"
     */
    getNumberOfRelationsFromSocialProofTextValue(socialProofText) {
        let pattern = /\d+/g;
        let matches = socialProofText.match(pattern);

        if( matches.length && matches[0] !== undefined ) {
            return parseInt(matches[0]);
        } else {
            console.log("getNumberOfRelationsFromSocialProofTextValue can't retrieve a number from the input string: " + socialProofText);
        }
    }


    /* Tranforms a JS object into a "List(...)" string used by LinkedIn in some 
     * of it's Voyager API requests.
     * eg: {network: "S", resultType: "PEOPLE"}  =>  "List(network->S,resultType->PEOPLE)"
     */
    voyagerListString(obj) {
        let str_list_contents = Object.keys(obj)
            .map(key => `${key}->${obj[key]}`)
            .join(',');

        return `List(${str_list_contents})`;
    }

    /* Checks that an object contains all mandatory keys. Returns true or false */
    checkMandatoryObjectKeys(input_object, mandatory_keys) {
        let object_keys_are_valid = true;

        if( typeof input_object === "object" ) {
            for(let i in mandatory_keys) {
                if( ! (mandatory_keys[i] in input_object) ) {
                    object_keys_are_valid = false;
                    break;
                }
            }
        } else {
            object_keys_are_valid = false;
        }

        return object_keys_are_valid;
    }


    /* ****************************** */
    /* GET_SEARCH_HITS HELPER METHODS */
    /* ****************************** */


    /* Syncronize search_hits_requests_history data in localStorage and 
     * this.searchHitsRequestsHistory data if necessary.
     * 
     * On every update to the value of search_hits_requests_history in localStorage, the flag 
     * this.searchHitsRequestsHistoryIsDirty is set to true.
     * In this case, we syncronize the localStorage data with the local this.searchHitsRequestsHistory
     * attribute.
     * Since this method is called on every update of search_hits_requests_history data, we also use it
     * to call this.removeSearchHitsRequestOlderThan24Hours() to remove timestamps older than 24 hours.
     *
     * This ensures that every call to "getSearchHitsRequestsHistory" is up-to-date without needing to access
     * the localStorage if not necessary, and automatically handles 
     **/
    syncGetSearchHitsLocalData() {
        if( this.searchHitsRequestsHistoryIsDirty ) {
            let searchHitsRequestsHistoryLSString = localStorage.getItem('search_hits_requests_history');
            let searchHitsRequestsHistory;

            if( searchHitsRequestsHistoryLSString !== null ) {
                searchHitsRequestsHistory = JSON.parse(searchHitsRequestsHistoryLSString);
            } else {
                searchHitsRequestsHistory = {};
            }

            this.searchHitsRequestsHistory = searchHitsRequestsHistory;
            this.searchHitsRequestsHistoryIsDirty = false;
        }
    }


    /* Gets the list of timestamps of previous getSearchHits requests */
    getSearchHitsRequestsHistory() {
        this.syncGetSearchHitsLocalData();
        return this.searchHitsRequestsHistory;
    }


    /* Sets the list of timestamps of previous getSearchHits requests */
    setSearchHitsRequestsHistory(search_hits_data) {
        localStorage.setItem('search_hits_requests_history', JSON.stringify(search_hits_data));
        this.searchHitsRequestsHistoryIsDirty = true;
    }


    /* Remove requests older than 24h in getSearchHits requests history */
    removeSearchHitsRequestOlderThan24Hours() {
        let searchHitsData = this.getSearchHitsRequestsHistory();
        let now_timestamp = Math.floor(Date.now() / 1000);
        let update_is_necessary = false;

        for(let search_id in searchHitsData) {

            let this_search_requests_history = searchHitsData[search_id].requests_history;

            /* Remove timestamps corresponding to requests older than 24 hours */
            let history_index = this_search_requests_history.length;

            /* Looping backwards so we can edit the array without breaking the loop */
            while(history_index--) {
                let request_timestamp = parseInt(searchHitsData[search_id].requests_history[history_index]);
                let seconds_diff = now_timestamp - request_timestamp;
                let hours_diff = seconds_diff / 3600;

                if( hours_diff >= 24 ) {
                    searchHitsData[search_id].requests_history.splice(history_index, 1);
                    update_is_necessary = true;
                }
            }
        }

        if( update_is_necessary ) {
            this.setSearchHitsRequestsHistory(searchHitsData);
        }
    }


    /* Adds the current Unix timestamp to the local history of getSearchHits requests */
    pingSearchHitsRequestsHistory(search_id, parameters) {
        let searchHitsHistory = this.getSearchHitsRequestsHistory();

        if( (! searchHitsHistory) || searchHitsHistory[search_id] === undefined ) {
            searchHitsHistory[search_id] = {
                requests_history: [],
                parameters: parameters
            };
        }

        searchHitsHistory[search_id].requests_history.push(Math.floor(Date.now() / 1000));

        this.setSearchHitsRequestsHistory(searchHitsHistory);
    }

    parseLinkedInUrn(urn) {
        let pattern = /urn\:li\:(.+)/;
        let matches = urn.match(pattern);

        if( matches.length && matches[1] !== undefined ) {
            let urn_data = matches[1].split(':').reverse();

            return {
                id: urn_data[0],
                kind: urn_data[1] || null
            };
        }

        return null;
    }

    getLocalMatchesDataFromSearchId(search_id) {
        let ls_key = 'search.'+search_id+'.match_data';
        let data = JSON.parse(localStorage.getItem(ls_key));

        if( ! data ) {
            data = {};
        }

        console.log('Local Data for Matches:', data);
        return data;
    }

    setLocalMatchesDataFromSearchId(search_id, data) {
        let ls_key = 'search.'+search_id+'.match_data';

        localStorage.setItem(ls_key, JSON.stringify(data));
    }

    getBestLocalSecondaryContactsFromSearchId(search_id, NUM_BEST_RESULTS) {

        // Order 2nd circle results per number of common contacts
        function compare_num_relationships( a, b ) {
            if ( a.member_number_of_common_relations < b.member_number_of_common_relations ){
            return 1;
            }
            if ( a.member_number_of_common_relations > b.member_number_of_common_relations ){
            return -1;
            }
            return 0;
        }

        // Get 2nd circle search data
        let processed_search_results = JSON.parse(localStorage.getItem('search.'+search_id+'.processed_data'));

        if( ! processed_search_results ) {
            return null;
        }

        /* Transform object into array to sort it and keep only the best results */
        let processed_search_results_array = [];

        for(let handle in processed_search_results) {
            let result_data = processed_search_results[handle];

            processed_search_results_array.push({
                public_id: handle, 
                common_relations_badges_urn: result_data.badge_urn,
                member_number_of_common_relations: result_data.num_relations
            });
        }

        processed_search_results_array.sort( compare_num_relationships );

        return processed_search_results_array.slice(0, NUM_BEST_RESULTS);
    }

    getLocalMatchesCountFromSearchId(search_id) {
        let this_search_match_data = this.getLocalMatchesDataFromSearchId(search_id);
        let this_search_matchs_count = {};

        for(let first_circle_contact_id in this_search_match_data) {
            let this_contact_data = this_search_match_data[first_circle_contact_id];

            this_search_matchs_count[first_circle_contact_id] = 0;

            if( this_contact_data.matching_relations ) {
                this_search_matchs_count[first_circle_contact_id] = Object.keys(this_contact_data.matching_relations).length;
            }
        }

        return this_search_matchs_count;
    }

    updateSearchMatchOnSFAPI(search_matches_hits) {
        // const httpOptions = {
        //   headers: new HttpHeaders({
        //     'Content-Type':  'application/json'
        //     })
        // };

        let put_req = this.http.post(
            environment.URL + "network/search-match", 
            search_matches_hits
        );

        put_req.subscribe( data => {
            console.log("updateSearchMatchOnSFAPI response (network/search-match)", JSON.stringify(data))
        }, error => {
            console.log("updateSearchMatchOnSFAPI ERROR (network/search-match)", JSON.stringify(error))
        });
    }

    refreshLocalNetworksPerPublicId() {
        if( ! this.networks_per_public_id ) {
            this.networks_per_public_id = {};

            let networks = JSON.parse(localStorage.getItem("myNetwork"));
            for(let i in networks) {
                let network_data = networks[i];
                this.networks_per_public_id[network_data['public_identifier']] = network_data;
            }
        }

        return this.networks_per_public_id;
    }

    getSearchMatchesInNetwork(search_id) {
        // Get count of 2nd circle profiles per 1st circle contacts for this search
        // this_search_matchs_count: { <first_circle_member_public_id>: <number of 2nd circle profiles found>}
        let this_search_matchs_count = this.getLocalMatchesCountFromSearchId(search_id);

        // Find matches with SF account
        let this_search_matchs_in_network = {};

        for(let this_search_public_id in this.networks_per_public_id) {
            if( ! this_search_matchs_count[this_search_public_id] ) {
                continue;
            }

            let this_match_network_data = this.networks_per_public_id[this_search_public_id];

            this_search_matchs_in_network[this_search_public_id] = this_match_network_data;
        }

        return this_search_matchs_in_network;
    }

    /* **************************** */
    /*     LI ENDPOINTS METHODS     */
    /* **************************** */

    /* Gets search hits for all the user's current searchs.
     * Abort request if the number of requests in the last 24 hours
     * is superior to this.MAX_SEARCH_PAGES_PER_DAY to make sure
     * the user won't get blacklisted by LinkedIn
    */
    getSearchHits(searchs) {

        // Order user's network by contact pub id
        this.refreshLocalNetworksPerPublicId();

        let search_matches_hits = [];

        for(let i in searchs) {
            let search_id = searchs[i].id;

            // Get count of 2nd circle profiles per 1st circle contacts for this search
            // this_search_matchs_count: { <first_circle_member_public_id>: <number of 2nd circle profiles found>}
            let this_search_matchs_count = this.getLocalMatchesCountFromSearchId(search_id);

            // Find matches in network
            let this_search_matchs_in_network = this.getSearchMatchesInNetwork(search_id);

            /* Prepare match data in network data to SF API */
            for(let network_user_public_id in this_search_matchs_in_network) {
                let network_user_data = this_search_matchs_in_network[network_user_public_id];
                let num_hits = this_search_matchs_count[network_user_public_id];

                search_matches_hits.push({
                    network_user: network_user_data.id,
                    search: search_id,
                    count: num_hits
                });
            }

            // GET 2nd circle Profiles with most common contacts with this search
            let processed_search_results_array = this.getBestLocalSecondaryContactsFromSearchId(search_id, 20);

            // Process 2nd circle results to get common relationships
            let that = this;

            for(let j in processed_search_results_array) {
                (function(search_id, search_results_arr) {
                    setInterval(function() {
                        that.getCommonContacts(search_id, search_results_arr);
                    }, 8500)
                })(search_id, processed_search_results_array[j]);
            }
        }

        /* Send Match data */
        console.log('SEARCH MATCH HITS', search_matches_hits);
        this.updateSearchMatchOnSFAPI(search_matches_hits);

        // Check we're still respecting the LinkedIn limits */
        let gsh_requests_history = this.getSearchHitsRequestsHistory();
        let num_requests = 0;

        for(let i in gsh_requests_history) {
            num_requests += gsh_requests_history[i].requests_history.length
        }

        console.log('num_searchhits_requests', num_requests);

        if( num_requests >= this.MAX_SEARCH_PAGES_PER_DAY ) {
            console.log('Too much requests for the last 24 hours. Aborting.');
            for(let i in this.searchHitsRequestsIntervals) {
                clearInterval(this.searchHitsRequestsIntervals[i]);
            }
            return;
        }

        console.log('search history ', gsh_requests_history);

        // Do the actual request 
        for(let i in searchs) {
            let search_id = searchs[i].id;
            this.getSearchHitsForSearchItem(search_id, searchs[i]);
        }
    }

    /* Gets the number of search hits for one particular search */
    getSearchHitsForSearchItem(search_id, search_data) {
        let start = 0;

        let that = this;

        if( this.gotTooManyRequestsErrorRecently() ) {
            return;
        }

        (function(search_id, search_data) {
            that.searchHitsRequestsIntervals[search_id] = setInterval(function() {
                let search_last_start = parseInt(localStorage.getItem('search.'+search_id+'.last_start'));

                if( ! search_last_start ) {
                    search_last_start = 0;
                }

                if( search_last_start < 300 ) {
                    // Send the getSearchHits request
                   
                    that.getSearchHitsBaseRequest(search_id, search_data, search_last_start);

                    localStorage.setItem('search.'+search_id+'.last_start', String(search_last_start + 10));
                } else {
                    console.error('SEARCH_LAST_START >= 300 for search <'+search_id+'>');
                    clearInterval(that.searchHitsRequestsIntervals[search_id]);
                }
            }, 10000);
        })(search_id, search_data);
    }

    getCommonContacts(search_id, second_circle_contact_data) {
        const headers = this.getHeader()
        const base_url = 'https://www.linkedin.com/voyager/api/search/blended';

        if( this.gotTooManyRequestsErrorRecently() ) {
            return;
        }

        // Check we're still respecting the LinkedIn limits */
        let gsh_requests_history = this.getSearchHitsRequestsHistory();
        let num_requests = 0;

        for(let i in gsh_requests_history) {
            num_requests += gsh_requests_history[i].requests_history.length
        }

        if( num_requests >= this.MAX_SEARCH_PAGES_PER_DAY ) {
            console.log('getCommonContacts: Too much requests for the day. Aborting.');
            return;
        }


        let contact_badge_urn_data = this.parseLinkedInUrn(
            second_circle_contact_data.common_relations_badges_urn
        );
        let contact_badge_urn = contact_badge_urn_data.id;
        let second_circle_contact_public_id = second_circle_contact_data.public_id;

        // Extend default parameters with user provided parameters
        let parameters = {
            filters: this.voyagerListString({
                network: 'F', 
                connectionOf: contact_badge_urn,
                resultType: 'PEOPLE'
            }),
            queryContext: this.voyagerListString({
                spellCorrectionEnabled: 'true',
                relatedSearchesEnabled: 'true'
            }),
            q: 'all',
            origin: 'MEMBER_PROFILE_CANNED_SEARCH',
            count: 10,
            start: 0
        };

        this.pingSearchHitsRequestsHistory(search_id, parameters);

        // Build request URL string
        let request_url = base_url + '?' + this.objectToQueryString(parameters);

        // Log request
        this.logLkdRequestToSlack('getCommonContacts', request_url);

        this.httpNative.get(request_url, {}, headers).then(
            (res: any) => {
                let li_response = JSON.parse(res.data);
                let li_data;
                let li_elements;
                let li_search_results = [];
                let first_circle_contacts_processed_results = [];

                li_data = li_response.data;
                if( li_data ) 
                    li_elements = li_data.elements;

                if( ! li_elements ) {
                    console.log("Can't process data returned by LI in getCommonContacts: ", li_response);
                    return;
                }

                // Loop through LinkedIn response's elements to find the item 
                // corresponding to "SEARCH_HITS"
                for(let i in li_elements) {
                    if( li_elements[i].type == "SEARCH_HITS" ) {
                        li_search_results = li_elements[i].elements;
                        break;
                    }
                }

                // Process first circle relations results
                for(let i in li_search_results) {
                    let this_li_result = li_search_results[i];

                    first_circle_contacts_processed_results.push({
                        public_identifier: this_li_result.publicIdentifier,
                        badges_urn: this_li_result['*badges']
                    });
                }

                let this_search_match_data = this.getLocalMatchesDataFromSearchId(search_id);

                // Save every secondary profiles that can be presented by first circle contacts
                for(let i in first_circle_contacts_processed_results) {
                    let first_result_profile_id = first_circle_contacts_processed_results[i].public_identifier;
                    
                    if( ! this_search_match_data[first_result_profile_id] ) {
                        this_search_match_data[first_result_profile_id] = {
                            profile_data: first_circle_contacts_processed_results[i],
                            matching_relations: {}
                        }
                    }

                    this_search_match_data[first_result_profile_id].matching_relations[second_circle_contact_public_id] = second_circle_contact_data;
                }

                this.setLocalMatchesDataFromSearchId(search_id, this_search_match_data);
            },
            error => {
                if( error.status == 429 ) {
                    // TOO MANY REQUESTS
                    localStorage.setItem('too_many_requests_timestamp', String(Math.floor(Date.now() / 1000)));
                }
                console.log("error getCommonContacts", error);
            }
        );
    }

    getSearchHitsBaseRequest(search_id, search_data, start) {
        
        const headers = this.getHeader()
        const base_url = 'https://www.linkedin.com/voyager/api/search/blended';

        const mandatory_parameters = ['start', 'keywords'];

        if( start === undefined ) {
            start = 0;
        }

        let custom_parameters = {
            keywords: search_data.title,
            start: start
        };

        const default_parameters = {
            filters: this.voyagerListString({
                network: 'S', 
                resultType: 'PEOPLE'
            }),
            queryContext: this.voyagerListString({
                spellCorrectionEnabled: 'true',
                relatedSearchesEnabled: 'true'
            }),
            q: 'all',
            origin: 'FACETED_SEARCH',
            count: 10,
            start: 0
        };

        // Check that custom_parameters are valid
        if( ! this.checkMandatoryObjectKeys(custom_parameters, mandatory_parameters) ) {
            console.log("Wrong parameters in getSearchHitsBaseRequest function. \n" +
                "Expected parameters: ", mandatory_parameters, 
                "Parameters provided: ", custom_parameters);

            return;
        }

        // Extend default parameters with user provided parameters
        let parameters = Object.assign({}, default_parameters, custom_parameters);

        // Build request URL string
        let request_url = base_url + '?' + this.objectToQueryString(parameters);

        // Log request
        this.logLkdRequestToSlack('getSearchHitsBaseRequest', request_url);
        
        // Send request
        this.httpNative.get(request_url, {}, headers).then(
            (res: any) => {
                let li_response = JSON.parse(res.data);
                let li_data;
                let li_elements;
                let li_search_results = [];
                let processed_search_results = JSON.parse(localStorage.getItem('search.'+search_id+'.processed_data'));

                if( ! processed_search_results ) {
                    processed_search_results = {};
                }

                /* Update list of requests history so we can limit the number of daily requests */
                parameters.start += 10;
                this.pingSearchHitsRequestsHistory(search_id, parameters);

                /* Check that the JSON response follows the expected format */
                li_data = li_response.data;
                if( li_data ) 
                    li_elements = li_data.elements;

                // No it doesn't
                if( ! li_elements ) {
                    console.log("Can't process data returned by LI in getSearchHits: ", li_response);
                    return;
                }

                // Loop through LinkedIn response's elements to find the item 
                // corresponding to "SEARCH_HITS"
                for(let i in li_elements) {
                    if( li_elements[i].type == "SEARCH_HITS" ) {
                        li_search_results = li_elements[i].elements;
                        break;
                    }
                }

                // Process search results
                for(let i in li_search_results) {
                    let this_result = li_search_results[i];
                    if( ! this_result || ! this_result.socialProofText ) {
                        console.log('socialProofText empty', i, li_search_results);
                        continue;
                    }
                    let num_of_relations = this.getNumberOfRelationsFromSocialProofTextValue(this_result.socialProofText);

                    processed_search_results[this_result.publicIdentifier] = {
                        num_relations: num_of_relations,
                        badge_urn: this_result['*badges']
                    };

                    let search_last_num_hits = parseInt(localStorage.getItem('search.'+search_id+'.last_num_hits'));
                    if( ! search_last_num_hits ) {
                        search_last_num_hits = 0;
                    }

                    let total_hits_for_now = search_last_num_hits + num_of_relations;
                    localStorage.setItem('search.'+search_id+'.last_num_hits', String(total_hits_for_now));
                }

                // Keep in storage the number of hits per 2nd circle contact
                localStorage.setItem('search.'+search_id+'.processed_data', JSON.stringify(processed_search_results));

                let total_hits_for_now = parseInt(localStorage.getItem('search.'+search_id+'.last_num_hits'));

                console.log('Search <'+search_id+'> num_hits: ' + total_hits_for_now);
            },
            error => {
                if( error.status == 429 ) {
                    // TOO MANY REQUESTS
                    localStorage.setItem('too_many_requests_timestamp', String(Math.floor(Date.now() / 1000)));
                }
                console.log("error getSearchHits", error);
            }
        );
    }

    sendMessage(messageInvit, receiver) {
        let header = this.getHeader()

        // Log request
        this.logLkdRequestToSlack('sendMessage', "https://www.linkedin.com/voyager/api/messaging/conversations?action=create");

        return this.httpNative
            .post(
                "https://www.linkedin.com/voyager/api/messaging/conversations?action=create",
                JSON.stringify(
                    {
                        "keyVersion": "LEGACY_INBOX",
                        "conversationCreate":
                            {
                                "eventCreate": {
                                    "value": {
                                        "com.linkedin.voyager.messaging.create.MessageCreate": {
                                            "body": messageInvit,
                                            "attachments": [],
                                            "attributedBody": {"text": messageInvit, "attributes": []},
                                            "mediaAttachments": [],
                                        }
                                    }
                                },
                                "recipients": [receiver],
                                "subtype": "MEMBER_TO_MEMBER"
                            },

                    }),
                header
            )
            .then(
                (res: any) => {
                    return res;
                },
                error => {
                    console.log("error network 1", error);
                }
            );
    }

    getCookiesLinkedin() {
        localStorage.removeItem("__advancedHttpCookieStore__")
        const headers = {
            "X-Li-User-Agent":
                "LIAuthLibrary:3.2.4 \
                  com.linkedin.LinkedIn:8.8.1 \
                  iPhone:8.3",
            "User-Agent": "LinkedIn/8.8.1 CFNetwork/711.3.18 Darwin/14.0.0",
            "X-User-Locale": "fr_FR",
            "Accept-Language": "fr_FR",
            accept: "application/vnd.linkedin.normalized+json+2.1"
        };

        this.httpNative.setDataSerializer("utf8");
        // this.httpNative.getCookieString(
        //   "https://www.linkedin.com/uas/authenticate"
        // );

        // Log request
        this.logLkdRequestToSlack('getCookiesLinkedin', "https://www.linkedin.com/uas/authenticate");

        return this.httpNative
            .get("https://www.linkedin.com/uas/authenticate", {}, headers)
            .then((res: any) => {
                console.log("Value for first call on linkedin : ", res);
                this.cookies = this.httpNative.getCookieString(
                    "https://www.linkedin.com/uas/authenticate"
                );
                console.log(this.cookies);
                this.cookies.split(";").forEach(value => {
                    if (value.indexOf("JSESSIONID") != -1) {
                        this.jsessionid = value.split("=")[1].split(";")[0];
                        console.log(
                            "jsessionid ------------------------>  ",
                            this.jsessionid
                        );
                    }
                });
            });
    }

    loginLinkedin(email, password) {
        console.log(email + " " + password);
        let headers2 = {
            "X-Li-User-Agent":
                "LIAuthLibrary:3.2.4 \
                  com.linkedin.LinkedIn:8.8.1 \
                  iPhone:11.0",
            "User-Agent": "LinkedIn/8.8.1 CFNetwork/711.3.18 Darwin/14.0.0",
            "X-User-Locale": "fr_FR",
            "Accept-Language": "fr_FR",
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/vnd.linkedin.normalized+json+2.1"
        };
         this.httpNative.setDataSerializer("utf8");
        let formData =  "session_key=" + email + "&session_password=" + password + "&JSESSIONID=" + this.jsessionid;
        console.log("-----------------> url <-------------; ", formData);
            
        // Log request
         this.logLkdRequestToSlack('loginLinkedin', "https://www.linkedin.com/uas/authenticate");
         console.log(headers2);
         return this.httpNative.post("https://www.linkedin.com/uas/authenticate", formData, headers2)
    }
    getNetwork(followersCount, start) {
        let header = this.getHeader()

        // Log request
      this.logLkdRequestToSlack('getNetwork', "https://www.linkedin.com/voyager/api/relationships/dash/connections?count=" +
                 followersCount +
                 "&start=" + start + "&decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-5&q=search&sortType=RECENTLY_ADDED");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/relationships/dash/connections?count=" +
                followersCount +
                "&start=" + start + "&decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-5&q=search&sortType=RECENTLY_ADDED",
                {},
                header
            )
    }

    getInfoProfile() {
        let header = this.getHeader()

        // Log request
        this.logLkdRequestToSlack('getInfoProfile', "https://www.linkedin.com/voyager/api/me");

        return this.httpNative.get("https://www.linkedin.com/voyager/api/me", {}, header)
    }

    getNetworkInfo(publicIdentifier) {
        let header = this.getHeader();

        // Log request
         this.logLkdRequestToSlack('getNetworkInfo', "https://www.linkedin.com/voyager/api/identity/profiles/" +
                 publicIdentifier +
                 "/networkinfo");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/identity/profiles/" +
                publicIdentifier +
                "/networkinfo",
                {},
                header
            )
    }

    globalSearch(start, list,titre) {
        let header = this.getHeader()
        
        console.log("URL SEARCH LINKEDIN : ",list)
        console.log("url search ","https://www.linkedin.com/voyager/api/search/blended?count=10&filters=List("+list+")&keywords="+escape(titre)+"&origin=GLOBAL_SEARCH_HEADER&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=" + parseInt(start));
        // Log Request
        this.logLkdRequestToSlack('globalSearch', "https://www.linkedin.com/voyager/api/search/blended?count=10&filters=List("+list+")&keywords="+escape(titre)+"&origin=FACETED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=" + parseInt(start));

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/search/blended?count=10&filters=List("+list+")&keywords="+escape(titre)+"&origin=GLOBAL_SEARCH_HEADER&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=" + parseInt(start),
                {},
                header
            )
    }
    commonContacts(nbrCommonContacts, relationBadge) {
        let header = this.getHeader()
        console.error("nbrCommonContacts ||| ",nbrCommonContacts);
        
        // Log Request
        this.logLkdRequestToSlack('commonContacts', "https://www.linkedin.com/voyager/api/search/blended?count=" + nbrCommonContacts + "&filters=List(network-%3E,connectionOf-%3E" + relationBadge + ",resultType-%3EPEOPLE)&origin=SHARED_CONNECTIONS_CANNED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=0");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/search/blended?count=" + nbrCommonContacts + "&filters=List(network-%3E,connectionOf-%3E" + relationBadge + ",resultType-%3EPEOPLE)&origin=SHARED_CONNECTIONS_CANNED_SEARCH&q=all&queryContext=List(spellCorrectionEnabled-%3Etrue,relatedSearchesEnabled-%3Etrue)&start=0",
                {},
                header
            )
    }
    getProfile(public_id) {
        let header = this.getHeader()

        // Log Request
        this.logLkdRequestToSlack('getProfile', "https://www.linkedin.com/voyager/api/identity/profiles/" + public_id + "/profileView");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/identity/profiles/" + public_id + "/profileView",
                {},
                header
            )
    }

    membreBudge(public_id) {
        let header = this.getHeader()

        // Log Request
       this.logLkdRequestToSlack('membreBudge', "https://www.linkedin.com/voyager/api/identity/profiles/" + public_id + "/memberBadges");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/identity/profiles/" + public_id + "/memberBadges",
                {},
                header
            )
    }
    saveSearch(searchInProgress){
        return this.http.post(environment.URL + "network/search-match", searchInProgress.contactSearchsMatch)
    }
    async doSearch() {
        
        this.searchInProgress = JSON.parse(localStorage.getItem("searchInProgress"))
        this.networks = JSON.parse(localStorage.getItem("myNetwork"));
/*    
        this.lastLunched = localStorage.getItem("lastLunched")
        let searchInProgress = JSON.parse(localStorage.getItem("searchInProgress"))

        //TODO save search exactly in end
        if(searchInProgress.total < searchInProgress.pageCounter * 10){
            this.saveSearch(searchInProgress)
        }
        console.error("this.lastLunched",(this.lastLunched)?"TRUEEE":"FALSEEE")
        //sss
        if( this.lastLunched &&
            this.lastLunched + 86400000 > Date.now() &&
            !this.msgErrorDoSearchShown
            ){
            this.msgErrorDoSearchShown = true
            console.error("ERREURE LIMITE")
            const alertDialog = await this.alertCtrl.create({
                header: 'Limite de recherche atteinte !',
                message: 'Recherche interrompu, ça va reprendre aprés 24h',
                buttons: [
                    {
                        text: 'Ok',
                        role: 'cancel'
                    }
                ]
            });
            await alertDialog.present();
            return
        }else{
            this.msgErrorDoSearchShown = false
        }



        this.backgroundMode = localStorage.getItem("backgroundMode")
*/

        if (localStorage.getItem("li_at")) {
            if(
                this.searchInProgress.searchPageCounter == 0 ||
                this.searchInProgress.searchTotal < this.searchInProgress.searchPageCounter * 10
            )
            this.runSearchAfterLinkedInLogin()
        } else {
            alert("not connected to Linekdin (missing linkedin login !!)")
        }
    }

    runSearchAfterLinkedInLogin() {
/*
        this.searchInProgress = JSON.parse(localStorage.getItem("searchInProgress"))
        console.log("DO ########## @@@@@@@ searchInProgress", this.searchInProgress)

        console.error("this.searchInProgress.pageCounter",this.searchInProgress)
*/
 
        //if (this.backgroundMode == "1" && (!this.lastLunched || this.lastLunched + 86400000 < Date.now()) )
            this.globalSearch(parseInt(this.searchInProgress.searchPageCounter), this.searchInProgress.searchList,this.searchInProgress.searchTitre).then((data) => {
                let body = JSON.parse(data.data);
                this.nbrRequestCommonContacts = 0
                this.nbrRequestCommonContactsDone = 0
                console.log("globalSearch data", data.data)
                console.log("body.metadata ::: ", body.data.metadata)
                //this.searchInProgress.total = body.data.metadata.totalResultCount
                let counter = []
                if (body.data && body.data.elements)
                    body.data.elements.forEach(value => {
                        if (value.elements) { 
                            value.elements.forEach(temp => {
                                if (temp.publicIdentifier && temp.socialProofText && temp.memberDistance.value == "DISTANCE_2") {
                                    console.warn("TEMP",temp)
                                    let relationBadge = temp.targetUrn.replace("urn:li:fs_miniProfile:", "")
                                    let nbrCommonContacts = temp.socialProofText.split(" ")[0] - 1;
                                    //console.log("nbrCommonContacts ::: ", nbrCommonContacts)
                                    //console.log("relationBadge ::: ", relationBadge)
                                    

                                    if (nbrCommonContacts > 0) {
                                        //console.log("search data", nbrCommonContacts)
                                        //if (this.backgroundMode == "1") {
                                            this.nbrRequestCommonContacts++

                                            this.commonContacts(nbrCommonContacts, relationBadge).then((data) => {
                                                this.nbrRequestCommonContactsDone++
                                                if (data) {
                                                    let body = JSON.parse(data.data);
                                                    if (body.data && body.data.elements) {
                                                        body.data.elements.forEach(value => {
                                                            if (value.elements) {
                                                                value.elements.forEach(temp => {
                                                                    //console.log("publicIdentifier", temp.publicIdentifier)
                                                                    if (temp.publicIdentifier) {
                                                                        if (typeof counter[temp.publicIdentifier] == 'undefined')
                                                                            counter[temp.publicIdentifier] = 0
                                                                        counter[temp.publicIdentifier]++
                                                                    }
                                                                })
                                                            }
                                                        })
                                                    }
                                                    
                                                    for (const [key, countValue] of Object.entries(counter)) {
                                                        let profile = this.networks.filter((val) => {
                                                            return val.public_identifier == key
                                                        })
                                                        if (!profile[0]) continue;
                                                        //console.log("profile ", profile[0]);
                                                        if (!this.searchInProgress.contactSearchsMatch)
                                                            this.searchInProgress.contactSearchsMatch = []
                                                        let indexFoundContactSearchMatch = this.searchInProgress.contactSearchsMatch.findIndex((valContactSearchMatch) => {
                                                            return valContactSearchMatch.network_user.id == profile[0].id
                                                        })
                                                        if (indexFoundContactSearchMatch > 0 || (indexFoundContactSearchMatch == 0 && this.searchInProgress.contactSearchsMatch[0].network_user.public_identifier == profile[0].public_identifier)) {
                                                            this.searchInProgress.contactSearchsMatch[indexFoundContactSearchMatch].count += countValue
                                                        } else {
                                                            let contactSearchMatch = {
                                                                network_user:profile[0].id,
                                                                count: countValue,
                                                                search: this.searchInProgress.id
                                                            }
                                                            this.searchInProgress.contactSearchsMatch.push(contactSearchMatch)
                                                        }

                                                        console.error("@@## nbrRequestCommonContactsDone", this.nbrRequestCommonContactsDone," == ", this.nbrRequestCommonContacts)

                                                    }
                                                }
                                                if (this.nbrRequestCommonContacts == this.nbrRequestCommonContactsDone) {

                                                    console.error("@@@@@@@@@@######### DONE DONE DONE ##########@@@@@@@@@@@@@")
                                                    
                                                    this.searchInProgress.pageCounter += 10
                                                    localStorage.setItem("searchInProgress", JSON.stringify(this.searchInProgress))
                                                    console.error("this.searchInProgress",this.searchInProgress)

                                                    this.saveSearch(this.searchInProgress).subscribe(data=>{
                                                        console.log("Post network/search-match",JSON.stringify(data))
                                                    },error=>{
                                                        console.log("ERROR Post network/search-match",JSON.stringify(error))
                                                    })
                                                    //sss
                                                    
                                                    if(this.searchInProgress.pageCounter < 100){
                                                         
                                                    }
                                                    //this.doSearch()
                                                    
                                                }
                                            }, (error) => { 
                                                this.nbrRequestCommonContactsDone++
                                                console.error("Error commonContacts", JSON.stringify(error))
                                                //alert("Error commonContacts")
                                            })
                                        //}
                                    }
                                }
                            });
                        }

                    })

            }, async error => {
                console.error("Error GlobalSearch", JSON.stringify(error))
                console.error("error.status == 429",(error.status == 429)?"error.status == 429":"error.status !!==!!! 429")
                if(error.status == 429){
                    localStorage.setItem("lastLunched",JSON.stringify(Date.now()))
                    const alertdialog = await this.alertCtrl.create({
                        header: 'Limite de recherche atteinte !',
                        message: 'Recherche interrompu, ça va reprendre aprés 24h',
                        buttons: [
                            {
                                text: 'Ok',
                                role: 'cancel'
                            }
                        ]
                    });
                    await alertdialog.present()
                    return
                }

            })
    }
    
    searchGeo(keyword){
        let header = this.getHeader()

        // Log Request
        this.logLkdRequestToSlack('searchGeo', "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+escape(keyword)+"&origin=OTHER&q=type&queryContext=List(geoVersion-%3E3,bingGeoSubTypeFilters-%3EMARKET_AREA%7CCOUNTRY_REGION%7CADMIN_DIVISION_1%7CCITY)&type=GEO&useCase=GEO_ABBREVIATED");

        console.log(escape(keyword));
        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+encodeURI(keyword)+"&origin=OTHER&q=type&queryContext=List(geoVersion-%3E3,bingGeoSubTypeFilters-%3EMARKET_AREA%7CCOUNTRY_REGION%7CADMIN_DIVISION_1%7CCITY)&type=GEO&useCase=GEO_ABBREVIATED",
                {},
                header
            )
    }
    searchJob(keyword){
        let header = this.getHeader()

        // Log Request
        this.logLkdRequestToSlack('searchJob', "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+escape(keyword)+"&origin=OTHER&q=type&queryContext=List(useCase-%3EMARKETPLACE_SKILLS)&type=SKILL");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+encodeURI(keyword)+"&origin=OTHER&q=type&queryContext=List(useCase-%3EMARKETPLACE_SKILLS)&type=SKILL",
                {},
                header
            )
    }

    searchSector(keyword){ 
        let header = this.getHeader()

        // Log Request
        this.logLkdRequestToSlack('searchSector', "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+escape(keyword)+"&origin=OTHER&q=type&type=INDUSTRY");

        return this.httpNative
            .get(
                "https://www.linkedin.com/voyager/api/typeahead/hitsV2?keywords="+encodeURI(keyword)+"&origin=OTHER&q=type&type=INDUSTRY",
                {},
                header
            )
    }

}
