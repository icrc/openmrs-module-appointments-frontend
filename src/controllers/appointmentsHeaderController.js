'use strict';

angular.module('bahmni.appointments')
    .controller('AppointmentsHeaderController', ['$scope', '$state', 'appService', 'appointmentCommonService', 'currentSessionUser',
        function ($scope, $state, appService, appointmentCommonService, currentSessionUser) {
            var setBackLinks = function () {
                var backLinks = [{label: "Home", url: Bahmni.Appointments.Constants.homeUrl, accessKey: "h", icon: "fa-home"}];

                var appointmentsPrivilegeForAdmin = Bahmni.Appointments.Constants.privilegeForAdmin;
                var hasAppointmentsAdminPrivilege = appointmentCommonService.isCurrentUserHavingPrivilege(appointmentsPrivilegeForAdmin, $scope.currentUser.privileges);

                var enableAdminPage = appService.getAppDescriptor().getExtensionById('bahmni.appointments.admin', true);

                backLinks.push({text: "APPOINTMENTS_MANAGE", state: "home.manage", accessKey: "M"});

                if (enableAdminPage) {
                    if (hasAppointmentsAdminPrivilege) {
                        backLinks.push({text: "APPOINTMENTS_ADMIN", state: "home.admin.service", accessKey: "A", requiredPrivilege: appointmentsPrivilegeForAdmin});
                    } else {
                        var roles = currentSessionUser && currentSessionUser.roles ? currentSessionUser.roles : [];

                        var isSystemDeveloper = roles.some(function (role) {
                            return role.display === 'System Developer' || role.name === 'System Developer';
                        });

                        if (isSystemDeveloper) {
                            backLinks.push({text: "APPOINTMENTS_ADMIN", state: "home.admin.service", accessKey: "A"});
                        }
                    }
                }
                $state.get('home').data.backLinks = backLinks;
            };
            var init = function () {
                setBackLinks();
            };
            return init();
        }]);
