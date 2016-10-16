import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
export { classNames } from 'classnames';
export { Link } from 'react-router';


export function common( obj ) {
    
   

    function mapDispatchToProps(dispatch) {

        let res = {};
        let actions = obj.actions;
        for( let item in actions ) {
            res[ item ] = bindActionCreators( actions[ item ], dispatch );
        }
        return res;

    }

    return connect (
      obj.mapStateToProps,
      mapDispatchToProps
    )( obj.component )
}



