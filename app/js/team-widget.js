$(function() {
    var teamWidget = {

        preferences: [],
        selects: [],
        wrapper: false,
        outerWrapper: false,
        hasActivePopup: false,
        textWrapper1: false,
        textWrapper2: false,
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

            teamWidget.textWrapper1 = $('<div class="team-widget-text text-1"></div>');
            teamWidget.textWrapper2 = $('<div class="team-widget-text text-2"></div>');

            teamWidget.outerWrapper.append(teamWidget.textWrapper1, teamWidget.textWrapper2);


            $('.team-widget').append(teamWidget.outerWrapper);

            this.parsePreferences();
            this.createNodes();
            this.createLabels();
            this.createSelects();
            this.createDescriptionText();
        },

        destroy: function () {
            // Show mobile variant.
            $('.team-widget .employees-wrapper').show();
            $('.desktop-team-widget').remove();

            teamWidget.preferences = [];
            teamWidget.selects = [];
            teamWidget.wrapper = false;
            teamWidget.hasActivePopup = false;
            teamWidget.labels = [[false, false], [false, false]];
            teamWidget.nodes = [];
        },

        createDescriptionText: function () {
            var text = 'Ontdek hier wie we zijn. Bekijk tegenstellingen of juist de overeenkomsten in het Fonkel team. Klik op een persoon om meer te lezen. ';
            teamWidget.outerWrapper.append('<div class="team-widget-description">' + text + '</div>');
        },

        createNodes: function () {
            window.teamData.forEach(function (teamMember) {
                var nodeDiv = $('<div class="node team-member-node" data-key="' + teamMember.key + '" style="background-image: url(\'/img/' + teamMember.key + '.jpg\');  background-position: ' + teamMember.left + '% ' + teamMember.top + '%;"></div>');
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
            if (teamWidget.hasActivePopup) { return; }

            var select = this;
            var delta = parseInt($(select).attr('data-delta'));
            $('body')
            .addClass('team-widget-is-changing')
            .attr('data-delta', delta);

            setTimeout(function () {
                // Disable the selected value in the other select.
                var otherSelect = select == teamWidget.selects[0][0] ? teamWidget.selects[1] : teamWidget.selects[0];
                otherSelect.find('option[disabled]').removeAttr('disabled');
                otherSelect.find('option[value="' + $(select).val() + '"]').attr('disabled', 'disabled');
                teamWidget.setLabelsForSelect(select);
                teamWidget.positionNodes();
                teamWidget.setInfoText(select, $(select).val());

                setTimeout(function () {
                    $('body')
                    .removeClass('team-widget-is-changing')

                    setTimeout(function () {
                        $('body').removeAttr('data-delta');
                    }, 1500)
                }, 400);
            }, 400);
        },

        setInfoText: function (select, value) {
            var delta = parseInt($(select).attr('data-delta'));
            var textWrapper = teamWidget['textWrapper' + (delta + 1)];
            textWrapper.html(window.preferences[value]);
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
            if (teamWidget.hasActivePopup) { return; }
            $('html').addClass('has-active-team-widget-popup');
            teamWidget.createTweenPhoto(this);
            teamWidget.createPopup(this);
            teamWidget.tweenToPopup();
        },

        tweenToPopup: function () {
            var targetOffset = teamWidget.popupImage.offset();

            teamWidget.tweenPhotoInner.css({
                transform: 'translate(0, ' + (targetOffset.top - $(window).scrollTop()) + 'px)',
                transition: '',
            });

            teamWidget.tweenPhoto.css({
                transform: 'translate(' + targetOffset.left + 'px, 0)',
                width: teamWidget.popupImage.width(),
                height: teamWidget.popupImage.height(),
                transition: '',
            });

            setTimeout(function () {
                teamWidget.popup.addClass('visible');
            }, 150);
        },

        createPopup: function (node) {
            teamWidget.hasActivePopup = true;

            var output = '<div class="team-member-image" style="background-image: url(\'/img/' + node.info.key + '.jpg\');  background-position: ' + node.info.left + '% ' + node.info.top + '%;"></div>';
            output += '<h3 class="team-member-title">' + node.info.name + '</h3>';
            output += '<h4 class="team-member-job">' + node.info.job + '</h4>';
            output += '<div class="team-member-bio">' + node.info.bio + '</div>';
            output += '<div class="team-member-mail">' + node.info.email + '</div>';

            teamWidget.popup = $('<div class="team-widget-popup"><div class="inner">' + output + '<div class="team-member-close"></div></div></div>');
            teamWidget.popupImage = teamWidget.popup.find('.team-member-image');
            $('body').append(teamWidget.popup);

            $('.team-member-close').on('click', function () {
               teamWidget.closePopup();
            });
        },

        closePopup: function () {

        },

        createTweenPhoto: function (node) {
            var clonedNode = $(node).clone();
            $(node).addClass('clicked');
            clonedNode.removeClass().addClass('image').css('transform', '');

            var outerWrapper = $('<div class="node-wrapper cloned node team-member-node"></div>');
            outerWrapper.append(clonedNode);

            $('body').append(outerWrapper);
            var offset = $(node).offset();
            teamWidget.tweenPhoto = outerWrapper;
            teamWidget.tweenPhotoInner = clonedNode;

            clonedNode.css({
                transition: 'none',
                transform: 'translate(0, ' + (offset.top - $(window).scrollTop()) + 'px)'
            });

            outerWrapper.css({
                transition: 'none',
                transform: 'translate(' + offset.left + 'px, 0px)'
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