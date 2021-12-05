import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const CreatePlanPage = React.lazy(() => import('../pages/CreatePlanPage'));
const UpdatePlanPage = React.lazy(() => import('../pages/UpdatePlanPage'));
const PlanFeedPage = React.lazy(() => import('../pages/PlanFeedPage'));
const HomePage = React.lazy(() => import('../pages/HomePage'));
const SearchEventsFeedPage = React.lazy(() => import('../pages/SearchEventsFeedPage'));

const route = [
    { path: '/createplan', exact: true, name: 'CreatePlan', component: CreatePlanPage },
    { path: '/updateplan', exact: true, name: 'UpdatePlan', component: UpdatePlanPage },
    { path: '/plans', exact: true, name: 'PlanFeed', component: PlanFeedPage },
    { path: '/', exact: true, name: 'Home', component: HomePage },
    { path: '/searchEvents', exact: true, name: 'SearchEvents', component: SearchEventsFeedPage }
];

export default route;