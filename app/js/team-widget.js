$(function() {
    var teamWidget = {

        preferences: [],
        selects: [],
        wrapper: false,
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

            teamWidget.wrapper = $('<div class="desktop-team-widget team-widget-graph"></div>');
            $('.team-widget').append(teamWidget.wrapper);

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
                var node = $('<div class="node" data-key="' + teamMember.key + '" style="background-image: url(\'/img/' + teamMember.key + '.jpg\');  background-position: ' + teamMember.left + '% ' + teamMember.top + '%;"></div>');
                teamWidget.wrapper.append(node);
                teamWidget.nodes.push(node);
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
                    teamWidget.labels[labelGroupDelta][labelDelta] = $('<label id="select' + (labelGroupDelta + 1) + '-label' + (labelDelta + 1) + '">Label</label>');
                    teamWidget.wrapper.append(teamWidget.labels[labelGroupDelta][labelDelta]);
                });
            });
        },

        selectChange: function () {
            // Disable the selected value in the other select.
            var otherSelect = this == teamWidget.selects[0][0] ? teamWidget.selects[1] : teamWidget.selects[0];
            otherSelect.find('option[disabled]').removeAttr('disabled');
            otherSelect.find('option[value="' + $(this).val() + '"]').attr('disabled', 'disabled');
            teamWidget.setLabelsForSelect(this);
            teamWidget.positionNodes();
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