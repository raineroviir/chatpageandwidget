let stripeStriptStatus = '';
export function LoadStripe() {
    if( status == 'loaded' || status === 'loading' ) {
        return;
    }
    status = 'loading';
    
    $.getScript( "https://js.stripe.com/v2/", () => {
        status = 'loaded';
        Stripe.setPublishableKey('pk_test_RI2LBciheix4A8Hw5l1aSJJN');
    } );
}