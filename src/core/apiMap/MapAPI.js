import { SERVER } from "./contains";

class MapAPI {
    getPlacesAutocomplete = body => {
        return authorizedRequest.get(
            API_LIST.PlacesAutocomplete + PREFIX + '&input=' + body.search,); // đường dẫn url
    };
}

export default new MapAPI();
