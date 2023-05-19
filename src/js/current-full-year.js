/**
* Setting up the current full year number of the main page's copyright statement dynamically.
*
* @author: NFG | Nikolaos Fragkiadakis
*
* Copyright © 2022 NFG | Nikolaos Fragkiadakis
*/
const CurrentFullYear = {
    init () {
        // The "current full year" element's id.
        const CURRENT_FULL_YEAR_ELEMENT_ID = '#current-full-year';

        // Get and set the "current full year" number.
        let currentFullYear = new Date().getFullYear();
        document.querySelector( CURRENT_FULL_YEAR_ELEMENT_ID ).innerHTML = currentFullYear;
    }
}

// Initialise the "current full year" component.
document.addEventListener( 'DOMContentLoaded', () => CurrentFullYear.init() );
