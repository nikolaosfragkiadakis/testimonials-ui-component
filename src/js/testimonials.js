/**
*  Setting up the "Testimonials UI Component's" functionality.
*
* @author: NFG | Nikolaos Fragkiadakis
*
* Copyright © 2022 NFG | Nikolaos Fragkiadakis
*/
const Testimonials = {
    init () {
        // 1. Select the "testimonials collection" element from the DOM
        //    ( it's an unordered list element ).
        let testimonialsCollection = document.querySelector( '.testimonials-collection' );

        // 2. Extract the "testimonials collection" element's children and
        //    store them in an Array.
        let testimonials = Array.from( testimonialsCollection.children );

        // 3. Select the "testimonials block" element's helper buttons.
        let leftButton = document.querySelector( '.testimonials--arrow-button--left' );
        let rightButton = document.querySelector( '.testimonials--arrow-button--right' );
        let indicatorsContainer = document.querySelector( '.indicators' );
        let indicators = Array.from( indicatorsContainer.children );

        // 4. Calculate the actual size of the "single testimonial" element
        //    according to the client's screen size.
        let singleTestimonialWidth = testimonials[ 0 ].getBoundingClientRect().width;

        // 5. Properly place the "single testimonial" elements on the client's  screen.
        testimonials.forEach( ( testimonial, index ) => {
            testimonial.style.left = singleTestimonialWidth * index + 'px';
        } );

        // 6. Set up the helper buttons functionality.

        // 6.1 These are some helper functions in order to avoid repetition.
        const moveToAnotherTestimonial = ( testimonialsCollection, startPoint, destination ) => {
            testimonialsCollection.style.transform = 'translateX( -' + destination.style.left + ' )';
            startPoint.classList.remove( 'single-testimonial--active' );
            destination.classList.add( 'single-testimonial--active' );
        }

        const updateIndicatorsStatus = ( activeIndicator, targetIndicator ) => {
            activeIndicator.classList.remove( 'indicator--active' );
            targetIndicator.classList.add( 'indicator--active' )
        }

        const updateHelperButtonsStatus = ( leftButton, rightButton, targetIndex, testimonials ) => {
            if ( targetIndex === 0 ) {
                leftButton.classList.add( 'testimonials--arrow-button--inactive' );
                rightButton.classList.remove( 'testimonials--arrow-button--inactive' );
            } else if ( targetIndex === testimonials.length - 1 ) {
                leftButton.classList.remove( 'testimonials--arrow-button--inactive' );
                rightButton.classList.add( 'testimonials--arrow-button--inactive' );
            } else {
                leftButton.classList.remove( 'testimonials--arrow-button--inactive' );
                rightButton.classList.remove( 'testimonials--arrow-button--inactive' );
            }
        }

        // 6.2 This is the "Left" ( or "Previous" ) button ( left chevron ).
        leftButton.addEventListener( 'click', click => {
            // Select the "active" testimonial element first.
            let activeTestimonial = testimonialsCollection.querySelector( '.single-testimonial--active' );

            // Then select the "previous" testimonial element.
            let previousTestimonial = activeTestimonial.previousElementSibling;
            let previousTestimonialIndex = testimonials.findIndex( testimonial => testimonial === previousTestimonial );

            // Also select and the "relevant" testimonials indicators elements.
            let activeIndicator = indicatorsContainer.querySelector( '.indicator--active' );
            let previousIndicator = activeIndicator.previousElementSibling;

            // And finally, move to that "previous" testimonial element and
            // switch the indicators "active" and helper buttons "inactive" status.
            moveToAnotherTestimonial( testimonialsCollection, activeTestimonial, previousTestimonial );
            updateIndicatorsStatus( activeIndicator, previousIndicator );
            updateHelperButtonsStatus( leftButton, rightButton, previousTestimonialIndex, testimonials );
        } );

        // 6.3 This is the "Right" ( or "Next" ) button ( right chevron ).
        rightButton.addEventListener( 'click', click => {
            // Select the "active" testimonial element first.
            let activeTestimonial = testimonialsCollection.querySelector( '.single-testimonial--active' );

            // Then select the "next" testimonial element.
            let nextTestimonial = activeTestimonial.nextElementSibling;
            let nextTestimonialIndex = testimonials.findIndex( testimonial => testimonial === nextTestimonial );

            // Also select and the "relevant" testimonials indicators elements.
            let activeIndicator = indicatorsContainer.querySelector( '.indicator--active' );
            let nextIndicator = activeIndicator.nextElementSibling;

            // And finally, move to that "next" testimonial element and
            // switch the indicators "active" and helper buttons "inactive" status.
            moveToAnotherTestimonial( testimonialsCollection, activeTestimonial, nextTestimonial );
            updateIndicatorsStatus( activeIndicator, nextIndicator );
            updateHelperButtonsStatus( leftButton, rightButton, nextTestimonialIndex, testimonials );
        } );

        // 6.4 These are the "Testimonials Indicators" buttons ( three dots ).
        indicatorsContainer.addEventListener( 'click', click => {
            // Figure out which indicator was clicked, since the "eventListener"
            // is hooked up on the "Indicators Container".
            let clickedIndicator = click.target.closest( 'button' );

            // Return early, if none of the "Testimonials Indicators" was clicked.
            if ( !clickedIndicator ) return;

            // Select the "active" testimonial element first.
            let activeTestimonial = testimonialsCollection.querySelector( '.single-testimonial--active' );

            // Then select the "active" testimonial indicator element.
            let activeIndicator = indicatorsContainer.querySelector( '.indicator--active' );

            // Moreover figure out which one indicator was clicked and which is
            // the destination testimonial.
            let clickedIndicatorIndex = indicators.findIndex( indicator => indicator === clickedIndicator );
            let destinationTestimonial = testimonials[ clickedIndicatorIndex ];

            // And finally, make your move to that "specific" destination testimonial
            // element and switch the indicators "active" and helper buttons
            // "inactive" status.
            moveToAnotherTestimonial( testimonialsCollection, activeTestimonial, destinationTestimonial );
            updateIndicatorsStatus( activeIndicator, clickedIndicator );
            updateHelperButtonsStatus( leftButton, rightButton, clickedIndicatorIndex, testimonials );
        } );
    } // end of "init".
}

// Initialise the "Testimonials UI Component".
document.addEventListener( 'DOMContentLoaded', () => Testimonials.init() );
