import API_LIST from "./mapData";
import * as APIConfig from './contains'
import authorizedRequest from "../service/authorizedRequest";
const URL = APIConfig.DEFAULT_URL;
const PREFIX = APIConfig.DEFAULT_PREFIX;

class MapAPI {
    getDirections = body => {
        return authorizedRequest.get(
            URL + API_LIST.Directions + '&origin=' + encodeURIComponent(body.origin[1] + ',' + body.origin[0]) + '&destination=' + encodeURIComponent(body.destination[1] + ',' + body.destination[0]) + "&vehicle=" + body.vehicle + '&api_key=' + PREFIX
            ,
        );
    };

    getFindText = body => {
        return authorizedRequest.get(
            API_LIST.Find_Place_from_text +
            PREFIX + '&input=' + body,
        );
    };

    getPlacesAutocomplete = body => {
        return authorizedRequest.get(
            API_LIST.PlacesAutocomplete +
            PREFIX + '&input=' + body.search,
        );
    };

    getGeocoding = body => {
        return authorizedRequest.get(
            API_LIST.Geocoding + body.description + '&api_key=' +
            PREFIX,
        );
    };

    getForwardGeocoding = body => {
        return authorizedRequest.get(
            API_LIST.ForwardGeocoding + body.description + '&api_key=' +
            PREFIX,
        );
    };
}

export default new MapAPI();
