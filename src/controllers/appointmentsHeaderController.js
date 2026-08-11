'use strict';

angular.module('bahmni.appointments')
    .controller('AppointmentsHeaderController', ['$scope', '$state', 'appService',
        function ($scope, $state, appService) {
            var setBackLinks = function () {
                var backLinks = [{label: "Home", url: Bahmni.Appointments.Constants.homeUrl, accessKey: "h", icon: "fa-home"}];

                // Verifica se o utilizador tem o privilégio de Admin OU de System Developer
                var hasAdminPrivilege = appService.getAppDescriptor().getConfigValue('requiredPrivilege') ||
                    [Bahmni.Appointments.Constants.privilegeForAdmin, 'System Developer'];

                backLinks.push({text: "APPOINTMENTS_MANAGE", state: "home.manage", accessKey: "M"});
                var enableAdminPage = appService.getAppDescriptor().getExtensionById('bahmni.appointments.admin', true);
                if (enableAdminPage) {
                    backLinks.push({text: "APPOINTMENTS_ADMIN", state: "home.admin.service", accessKey: "A", requiredPrivilege: hasAdminPrivilege});
                }
                $state.get('home').data.backLinks = backLinks;
            };
            var init = function () {
                setBackLinks();
            };
            return init();
        }]);
