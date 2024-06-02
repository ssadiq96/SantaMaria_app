import { CommonActions, useNavigation } from '@react-navigation/native';
import { NavigationActions, StackActions } from '@react-navigation/compat';

let _navigator;


export let globalNavRef;
/**
 * 
 * @param {*} navigatorRef 
 * set the navigator ref to local ref from NavigationRoot file
 */
function setTopLevelNavigator(navigatorRef) {
   _navigator = navigatorRef;
   globalNavRef = navigatorRef;
};

/**
 * 
 * @returns the navigator 
 */
function getGlobalNavigator() {
   return globalNavRef;
}

/**
 * 
 * @param {*} routeName 
 * @param {*} params 
 * provide navigation to given routename
 */
function navigate(routeName, params) {
   console.log("routeName", routeName, params);
   _navigator.navigate(
      routeName, params
   )
};
function resetnavigate(routeName, params) {
   // console.log(" _navigator _navigator", _navigator.getState());
   // console.log("currentRoute123:-->", _navigator.getCurrentRoute());
   const currentRoute = _navigator.getCurrentRoute()
   if (currentRoute.name === routeName) {

      _navigator.dispatch(
         CommonActions.reset({
            index: 1,
            routes: [
               { name: 'TabNavigator' },
               {
                  name: routeName,
                  params: params,
               },
            ],
         })
      );

   }
   else {
      _navigator.navigate(
         routeName, params
      )
   }

   // _navigator.navigate(
   //    routeName, params
   // )
};
/**
 * 
 * @returns navigation state
 */
function getState() {
   return _navigator.state.nav;
};

/**
 * 
 * @param {*} navigationState 
 * @returns get current route name
 */
function getCurrentRoute(navigationState) {
   const route = navigationState.routes[navigationState.index];
   // dive into nested navigators
   if (route.routes) {
      return getCurrentRoute(route);
   }
   return route;
};

/**
 * 
 * @param {*} params 
 * sets the custom params to route navigation
 */
function setParams(params) {
   const currentRoute = getCurrentRoute(getState());
   let { key } = currentRoute;
   _navigator.dispatch(
      NavigationActions.setParams({
         key,
         params,
      })
   );
};

/** goback method */
function goBack() {
   _navigator.dispatch(
      NavigationActions.back({})
   );
};
// add other navigation functions that you need and export them

/**
 * navigation popToTop method
 */
function popToTop() {
   _navigator.dispatch(StackActions.popToTop());
}

/** stack reset action method */
function resetAction(routeName, params, index = 0) {
   _navigator.dispatch(
      CommonActions.reset({
         routes: [{ name: routeName, params }]
      })
   );
}

/**
 * 
 * @param {*} mainTabRouteName 
 * @param {*} nextScreenName 
 * @param {*} params 
 * stack reset handling
 */
function stackReset(mainTabRouteName, nextScreenName, params) {
   const resetAction = CommonActions.reset({
      key: '',
      index: 0,
      routeNames: [mainTabRouteName]
   })
   _navigator.dispatch(resetAction)
   const screenActions = NavigationActions.navigate({
      routeName: nextScreenName,
      params: params
   })
   _navigator.dispatch(screenActions)
}


/**
 * Navigation Service Facility for provide different Kind of routing
 */
export default {
   goBack,
   navigate,
   getState,
   setParams,
   popToTop,
   resetAction,
   getCurrentRoute,
   setTopLevelNavigator,
   stackReset,
   getGlobalNavigator,
   resetnavigate
};