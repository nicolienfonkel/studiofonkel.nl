$(function() {
    var teamWidget = {

        preferences: [],
        selects: [],
        wrapper: false,
        outerWrapper: false,
        variant: false,
        labels: [[false, false], [false, false]],
        nodes: [],

        init: function () {
            var init = function () {
                if ($(window).width() > 1279 && teamWidget.variant != 'desktop') {
                    teamWidget.variant = 'desktop';
                    teamWidget.create();
                }
                else if ($(window).width() < 1280 && teamWidget.variant != 'mobile') {
                    teamWidget.variant = 'mobile';
                    teamWidget.destroy();
                }

                if (teamWidget.variant == 'desktop') {
                    teamWidget.positionNodes();
                }
            };

            $(window).on('resize', debounce(init, 400));
            init();
        },

        create: function () {
            // Hide mobile variant.
            $('.team-widget .employees-wrapper').hide();

            teamWidget.outerWrapper = $('<div class="desktop-team-widget"></div>');
            teamWidget.wrapper = $('<div class="team-widget-graph"></div>');
            teamWidget.outerWrapper.append(teamWidget.wrapper);

            teamWidget.textWrapper = $('<div class="team-widget-text"></div>');
            teamWidget.outerWrapper.append(teamWidget.textWrapper);


            $('.team-widget').append(teamWidget.outerWrapper);

            this.parsePreferences();
            this.createNodes();
            this.createLabels();
            this.createSelects();
        },

        destroy: function () {
            // Show mobile variant.
            $('.team-widget .employees-wrapper').show();
            $('.desktop-team-widget').remove();

            teamWidget.preferences = [];
            teamWidget.selects = [];
            teamWidget.wrapper = false;
            teamWidget.labels = [[false, false], [false, false]];
            teamWidget.nodes = [];
        },

        createNodes: function () {
            window.teamData.forEach(function (teamMember) {
                var nodeDiv = $('<div class="node" data-key="' + teamMember.key + '" style="background-image: url(\'/img/' + teamMember.key + '.jpg\');  background-position: ' + teamMember.left + '% ' + teamMember.top + '%;"></div>');
                teamWidget.wrapper.append(nodeDiv);
                teamWidget.nodes.push(nodeDiv);
                nodeDiv[0].info = teamMember;

                nodeDiv.on('click', teamWidget.nodeClick);
            });
        },

        positionNodes: function () {
            teamWidget.nodes.forEach(function (node) {
                var currentMemberXY = [];
                teamWidget.selects.forEach(function (select, delta) {
                    var selectedValue = $(select).val();

                    var currentTeamMember = window.teamData.filter(function (teamMember) {
                        return teamMember.key == $(node).attr('data-key')
                    })[0];

                    currentMemberXY.push(currentTeamMember.preferences[selectedValue]);
                });

                var widgetWidth  = $(teamWidget.wrapper).width();
                var widgetHeight  = $(teamWidget.wrapper).height();

                $(node).css({
                    transform: 'translate(-50%, -50%) translate(' + ((currentMemberXY[0] / 100) * widgetWidth) + 'px, ' + ((currentMemberXY[1] / 100) * widgetHeight) + 'px)'
                });
            })
        },

        setLabelsForSelect: function (select) {
            var delta = parseInt($(select).attr('data-delta'));
            var selectedKey = $(select).val();
            var preferenceInfo = teamWidget.preferences.filter(function (preference) {
                return preference.key == selectedKey;
            })[0];

            teamWidget.labels[delta][0].html(preferenceInfo.preference1);
            teamWidget.labels[delta][1].html(preferenceInfo.preference2);

            $(select).width(teamWidget.labels[delta][1].innerWidth());
        },

        createLabels: function () {
            teamWidget.labels.forEach(function (labelGroup, labelGroupDelta) {
                labelGroup.forEach(function (label, labelDelta) {
                    teamWidget.labels[labelGroupDelta][labelDelta] = $('<label class="select-label" id="select' + (labelGroupDelta + 1) + '-label' + (labelDelta + 1) + '">Label</label>');
                    teamWidget.wrapper.append(teamWidget.labels[labelGroupDelta][labelDelta]);
                });
            });
        },

        selectChange: function () {
            var select = this;
            $('body').addClass('team-widget-is-changing');

            setTimeout(function () {
                // Disable the selected value in the other select.
                var otherSelect = select == teamWidget.selects[0][0] ? teamWidget.selects[1] : teamWidget.selects[0];
                otherSelect.find('option[disabled]').removeAttr('disabled');
                otherSelect.find('option[value="' + $(select).val() + '"]').attr('disabled', 'disabled');
                teamWidget.setLabelsForSelect(select);
                teamWidget.positionNodes();
                teamWidget.setInfoText($(select).val());


                setTimeout(function () {
                    $('body').removeClass('team-widget-is-changing');
                }, 400);
            }, 400);
        },

        setInfoText: function (value) {
            teamWidget.textWrapper.html(window.preferences[value]);
        },

        createSelect: function (selected) {
            var delta = teamWidget.selects.length;
            var select = $('<select data-delta="' + delta + '" id="select' + (delta + 1) + '"></select>');

            teamWidget.preferences.forEach(function (preference) {
                if (preference.key == teamWidget.preferences[delta].key) {
                    select.append('<option selected value="' + preference.key + '">' + preference.key + '</option>');
                }
                else {
                    select.append('<option value="' + preference.key + '">' + preference.key + '</option>');
                }
            });

            select.on('change', teamWidget.selectChange);
            teamWidget.selects.push(select);
            teamWidget.wrapper.append(select);
            return select;
        },

        createSelects: function () {
            var select1 = teamWidget.createSelect();
            var select2 = teamWidget.createSelect();

            select1.change();
            select2.change();
        },

        parsePreferences: function () {
            Object.keys(window.teamData[0].preferences).forEach(function (preference) {
                var preferenceSplit = preference.split(' vs. ');
                teamWidget.preferences.push({
                    preference1: preferenceSplit[0],
                    preference2: preferenceSplit[1],
                    key: preference
                });
            });
        },

        nodeClick: function () {
            teamWidget.createTweenPhoto(this);
        },

        createTweenPhoto: function (node) {
            var clonedNode = $(node).clone();
            clonedNode.addClass('cloned');
            $('body').append(clonedNode);
        }

    };

    teamWidget.init();

});

function debounce(callback, time) {
    var timeout;

    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(callback, time);
    };
};