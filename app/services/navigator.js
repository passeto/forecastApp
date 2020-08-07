import { StackActions, NavigationActions } from 'react-navigation';
import { times } from 'ramda';

let instance;

function setContainer(container) {
  if (container) {
    instance = container;
    console.log('[NavigatorService] Instance setted!');
  }
}

function dispatch(...args) {
  if (!instance) {
    throw new Error(
      '[NavigatorService] Trying to dispatch task to container when there is no container...'
    );
  }

  return instance.dispatch(...args);
}

function getRouteNameFromState(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getRouteNameFromState(route);
  }
  return route.routeName;
}

function reset(routeName, params = {}) {
  dispatch(
    StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName,
          params,
        }),
      ],
    })
  );
}

function navigate(routeName, params) {
  dispatch(
    NavigationActions.navigate({
      type: 'Navigation/NAVIGATE',
      routeName,
      params,
    })
  );
}

function navigateDeep(actions) {
  dispatch(
    actions.reduceRight(
      (prevAction, action) =>
        NavigationActions.navigate({
          type: 'Navigation/NAVIGATE',
          routeName: action.routeName,
          params: action.params,
          action: prevAction,
        }),
      undefined
    )
  );
}

function back(key = null) {
  dispatch(NavigationActions.back({ key }));
}

function backTimes(n = 1, key = null) {
  times(() => back(key), n);
}

function getCurrentRoute() {
  if (!instance || !instance.state.nav) {
    return null;
  }

  return instance.state.nav.routes[instance.state.nav.index] || null;
}

export default {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
  getRouteNameFromState,
  dispatch,
  back,
  backTimes,
};

export {
  setContainer,
  navigateDeep,
  navigate,
  reset,
  getCurrentRoute,
  getRouteNameFromState,
  dispatch,
  back,
  backTimes,
};
