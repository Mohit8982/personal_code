const router = require("express").Router();
const moment = require('moment');
const { ajaxSession } = require('../helper_function/session');
const { findQuery, deleteQuery, insertquery, updateQuery } = require('../services/crud_operation');
const _ = require('lodash');

router.post('/raw_idea_next', ajaxSession, async(req, res) => {
    try {
        const {skipNumber, id} = req.body;

        const next_idea = await findQuery('raw_idea', { idea_stage: id }, "def", 5, skipNumber, {});
        
        if (next_idea.length <= 0) {
            return res.json({
                status: 0,
                message: "No Ideas Found"
            });
        }
        let html = '';

        for (index in next_idea) {
            let img = '';
            let { img_path, _id, description, created_on, idea_stage } = next_idea[index];
            created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY')
            if (img_path.length > 0) {
                img = `<img class="img-fluid" src="/${img_path}" />`;
            }
            html += `<div class="text-row ib-bc-sl-sic droppablesSelector ui-sortable-handle" onclick="rawModal('${_id}')" id="cardID${_id}" data-idea-id="${_id}" data-toggle="modal" data-target=".add-new-idea-modal">
                        <div class="ib-sortable-item">
                            <div class="ib-base-card">
                                <div class="ib-base-card-layout">
                                    <div class="ib-base-card-layout-content">
                                        <div class="ib-base-card-layout-img">
                                            ${img}
                                        </div>
                                        <div class="ib-base-card-layout-title">
                                                <span class="ib-base-card-layout-title--indented ${(idea_stage == 1) ? 'n-indented' : '' } ">
                                                ${(idea_stage == 1) ? `<div class="ib-card-selection" data-toggle="tooltip" data-placement="top" title="Select to merge idea">
                                                    <svg class="svg-icon ib-check-icon" focusable="false" viewBox="0 0 512 512">
                                                        <g transform="translate(0,512) scale(0.100000,-0.100000)" stroke="none">
                                                            <path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m539 -426 c458 -67 874 -277 1206 -609 283 -284 472 -615 570 -1004 81 -321 81 -701 0 -1022 -98 -389 -287 -720 -570 -1004 -334 -334 -742 -540 -1215 -611 -156 -24 -444 -24 -600 0 -474 72 -880 277 -1217 613 -331 332 -538 742 -609 1213 -24 156 -24 444 0 600 71 473 277 881 611 1215 370 370 840 586 1370 629 91 7 345 -4 454 -20z"/>
                                                            <path d="M3495 3433 c-82 -18 -89 -24 -702 -636 l-613 -611 -227 226 c-233 232 -279 267 -348 268 -125 0 -230 -119 -210 -239 4 -22 19 -59 35 -83 16 -24 165 -179 332 -344 286 -285 306 -303 358 -318 63 -19 108 -14 165 19 52 31 1398 1379 1421 1425 27 52 24 135 -6 190 -38 68 -137 118 -205 103z"/>
                                                        </g>
                                                    </svg>
                                                </div>` : ""}
                                                <span class="ib-base-card-task-name ib-fs-12" id="descid${_id}">${ description }</span>
                                            </span>
                                            <div class="ib-base-card-layout-complete-show d-none">
                                                <div class="ib-base-card-layout-complete-task-row-complete-status">
                                                    <svg class="circle-check-icon-small circle-check-icon" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class=""></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class=""></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="ib-bcl-cpt"></div>
                                        <div class="ib-bcl-action-options">
                                            <div class="ib-bcl-idea-date">
                                                <span class="cmmt-count-and-icon ib-common-gray">${ created_on }</span>
                                            </div>
                                            <div class="ib-bcl-asign-handle ib-visibility-off">
                                                <div class="user-avatar asign-user-avatar">
                                                    <div class="avatar-img avatar-img-wh"></div>
                                                </div>
                                            </div>
                                            <div class="ib-bcl-cmmt-action-btn ib-visibility-off">
                                                <span class="cmmt-count-and-icon cmmt-ci-gray">
                                                    3
                                                    <svg class="cmmt-icon ib-ml-4" focusable="false" viewBox="0 0 24 24">
                                                    <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                }

        return res.json({
            status: 1,
            message: "Success",
            data: html
        });
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error : ${error.toString()}`
        })
    }
});

router.post('/other_stage_next', ajaxSession, async(req, res) => {
    try {
        const { skipNumber, stage_id } = req.body;

        const getStageData = await findQuery('stages', { _id: stage_id }, "4", 5, parseInt(skipNumber), {});

        const { ideas_under } = getStageData[0];
        if (ideas_under.length <= 0) {
            return res.json({
                status: 0,
                message: "No Ideas Found"
            });
        }
        let html = '';
        for (index in ideas_under) {
            let { _id, description, created_on } = ideas_under[index];
            created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY');
            html += `<div class="text-row ib-bc-sl-sic droppablesSelector ui-sortable-handle" onclick="rawModal('${_id}')" id="cardID${_id}" data-last-stage="" data-idea-id="${_id}" data-stage-id="${stage_id}" data-target=".common-modal" data-toggle="modal">
            <div class="ib-sortable-item">
                <div class="ib-sort-item-cont">
                    <div class="ib-base-card">
                        <div class="ib-base-card-layout">
                            <div class="ib-base-card-layout-content">
                                <!-- <div class="ib-base-card-layout-img">
                                    <img class="img-fluid" src="https://cimsec.org/wp-content/uploads/2016/06/r0Eh9Aw.png" />
                                </div> -->
                                <div class="ib-base-card-layout-title">
                                    <span class="ib-base-card-layout-title--indented n-indented">
                                                <div class="ib-card-selection" data-toggle="tooltip" data-placement="top" title="Select to merge idea">
                                                <svg class="svg-icon ib-check-icon" focusable="false" viewBox="0 0 512 512">
                                                    <g transform="translate(0,512) scale(0.100000,-0.100000)" stroke="none">
                                                        <path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m539 -426 c458 -67 874 -277 1206 -609 283 -284 472 -615 570 -1004 81 -321 81 -701 0 -1022 -98 -389 -287 -720 -570 -1004 -334 -334 -742 -540 -1215 -611 -156 -24 -444 -24 -600 0 -474 72 -880 277 -1217 613 -331 332 -538 742 -609 1213 -24 156 -24 444 0 600 71 473 277 881 611 1215 370 370 840 586 1370 629 91 7 345 -4 454 -20z"></path>
                                                        <path d="M3495 3433 c-82 -18 -89 -24 -702 -636 l-613 -611 -227 226 c-233 232 -279 267 -348 268 -125 0 -230 -119 -210 -239 4 -22 19 -59 35 -83 16 -24 165 -179 332 -344 286 -285 306 -303 358 -318 63 -19 108 -14 165 19 52 31 1398 1379 1421 1425 27 52 24 135 -6 190 -38 68 -137 118 -205 103z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        <span class="ib-base-card-task-name ib-fs-12" id="descid${_id}" >
                                            ${description}
                                        </span>
                                    </span>
                                    <div class="ib-base-card-layout-complete-show d-none">
                                        <div class="ib-base-card-layout-complete-task-row-complete-status">
                                            <svg class="circle-check-icon-small circle-check-icon" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class=""></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class=""></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div class="ib-bcl-cpt"></div>
                                <div class="ib-bcl-action-options">
                                    <div class="ib-bcl-idea-date">
                                        <span class="cmmt-count-and-icon ib-common-gray"> ${created_on} </span>
                                    </div>
                                    <div class="ib-bcl-asign-handle ib-visibility-off">
                                        <div class="user-avatar asign-user-avatar">
                                            <div class="avatar-img avatar-img-wh"></div>
                                        </div>
                                    </div>
                                    <div class="ib-bcl-cmmt-action-btn ib-visibility-off">
                                        <span class="cmmt-count-and-icon cmmt-ci-gray">
                                            3
                                            <svg class="cmmt-icon ib-ml-4" focusable="false" viewBox="0 0 24 24">
                                            <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>`;
        }

        return res.json({
            status: 1,
            message: "Success",
            data: html
        });
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error : ${error.toString()}`
        })
    }
});

router.post('/get_other_stage', ajaxSession, async(req, res) => {
    try {
        const getStage = await findQuery('stages', { default: true }, "4", 5, 0, {})
        let html = '';
        for (index in getStage) {
            let { _id, department_name, stage_name, flag, ideas_under } = getStage[index];
            let stage_id = _id;
            html += `<div class="ib-sortable-list-sic">
                        <div class="ib-bb-draggable-card-container">
                        <div class="ib-task-board-column ib-task-boardbody-column">
                        <div class="ib-board-column-header">
                            <div class="ib-board-column-head ib-board-column--head">
                                <h3 class="tg-style ib-board-column-head-title ib-mr-auto ib-fs-16">
                                    ${stage_name} ${(department_name) ? `(${department_name})` : ``} 
                                </h3>
                            </div>
                        </div>
                        <div class="ib-board-column-sc ib-mt-8">
                            <div class="ib-bc-sc-scrollable ib-scrollable-container-max-height nc-scrollbar" >
                                <input type="hidden" value="5" class="nc-skip-value ${stage_id}" />
                                <input type="hidden" value="div${stage_id}" class="nc-div-id" />
                                <div class="ib-bc-sc-cardsList">
                                    <div class="sortable ui-sortable ib-bc-sl-card-container ib-bc-sl-card-container--column sort" id="div${stage_id}" data-status-id="${flag}" data-stage-name="${stage_name}" data-current-id="${stage_id}">`
                                        for(index1 in ideas_under)
                                            {
                                                let {primary_task_title, primary_task, _id, created_on}  = ideas_under[index1];

                                                created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY');

                                                html += `<div class="text-row ui-sortable-handle ib-bc-sl-sic droppablesSelector" onclick="stageModal('${_id}')" id="cardID${_id}" data-last-stage="" data-idea-id="${_id}" data-stage-id="${stage_id}" data-target=".common-modal" data-toggle="modal">
                                                            <div class="ib-sortable-item">
                                                                <div class="ib-sort-item-cont">
                                                                    <div class="ib-base-card">
                                                                        <div class="ib-base-card-layout">
                                                                            <div class="ib-base-card-layout-content">
                                                                                <!-- <div class="ib-base-card-layout-img">
                                                                                    <img class="img-fluid" src="https://cimsec.org/wp-content/uploads/2016/06/r0Eh9Aw.png" />
                                                                                </div> -->
                                                                                <div class="ib-base-card-layout-title">
                                                                                    <span class="ib-base-card-layout-title--indented">
                                                                                        <span class="ib-base-card-task-name ib-fs-12" id="descid${_id}">
                                                                                            ${primary_task_title}
                                                                                        </span>
                                                                                    </span>
                                                                                    <div class="ib-base-card-layout-complete-show d-none">
                                                                                        <div class="ib-base-card-layout-complete-task-row-complete-status">
                                                                                            <svg class="circle-check-icon-small circle-check-icon" focusable="false" viewBox="0 0 32 32">
                                                                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class=""></path>
                                                                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class=""></path>
                                                                                            </svg>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div class="ib-bcl-cpt"></div>
                                                                                <div class="ib-bcl-action-options">
                                                                                    <div class="ib-bcl-idea-date">
                                                                                        <span class="cmmt-count-and-icon ib-common-gray"> ${created_on} </span>
                                                                                    </div>
                                                                                    <div class="ib-bcl-asign-handle ib-visibility-off">
                                                                                        <div class="user-avatar asign-user-avatar">
                                                                                            <div class="avatar-img avatar-img-wh"></div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="ib-bcl-cmmt-action-btn ib-visibility-off">
                                                                                        <span class="cmmt-count-and-icon cmmt-ci-gray">
                                                                                            3
                                                                                            <svg class="cmmt-icon ib-ml-4" focusable="false" viewBox="0 0 24 24">
                                                                                            <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                                                                                            </svg>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>`
                                        }
                    html += `</div></div></div>`
                    if(flag == 1){
                        html += `<div class="ib-cards-option"><div class="ib-card-option-group"><span class="ib-common-btn ib-merge-btn" onclick="appendMerge()" data-target=".merge-ideas-modal" data-toggle="modal">Merge Selected Ideas</span></div></div>`
                    }
            html +=  `</div></div></div></div>`;
        }
        return res.json({ 
            status : 1,
            message : "Success",
            data : html 
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/get_initial_stage',  async(req, res) => {
    try {
        const raw_ideas = await findQuery('raw_idea', {idea_stage : 0 } , "3", 5, 0, {});
        const final_ideas = await findQuery('raw_idea', {  idea_stage : 1 }, "3", 5, 0, {});

        const merge_data = [...raw_ideas, ...final_ideas];

        const grouped = _.groupBy(merge_data, function(raw_idea) {
            return raw_idea.idea_stage;
        });

        if(grouped['1'] == undefined) grouped['1'] = {};
        if(grouped['0'] == undefined) grouped['0'] = {};

        let html = '';

        _.forEach(grouped, (key, val)=>{

            let id_div = 'raw_idea';
            if(val == 1){ id_div = 'final_idea' }

            html += `<div class="ib-sortable-list-sic">
            <div class="ib-bb-draggable-card-container">
                <div class="ib-task-board-column ib-task-boardbody-column">
                    <div class="ib-board-column-header">
                        <div class="ib-board-column-head ib-board-column--head">
                            <h3 class="tg-style ib-board-column-head-title ib-mr-auto ib-fs-16">
                                ${(val == "0") ? 'Raw Idea' : 'Final Idea'}
                            </h3>
                            ${(val == 1) ? `<div class="ib-theme-icon-btn ib-bc-head-action-icon filter-trigger-btn" role="button" aria-label="" tabindex="0" data-ralated-value="Final Idea">
                                 <svg class="svg-icon" focusable="false" viewBox="0 0 24 24">
                                     <path d="M20,8H4C3.4,8,3,7.6,3,7s0.4-1,1-1h16c0.6,0,1,0.4,1,1S20.6,8,20,8z M18,13c0-0.6-0.4-1-1-1H7c-0.6,0-1,0.4-1,1s0.4,1,1,1h10C17.6,14,18,13.6,18,13z M15,19c0-0.6-0.4-1-1-1h-4c-0.6,0-1,0.4-1,1s0.4,1,1,1h4C14.6,20,15,19.6,15,19z"></path>
                                 </svg>
                             </div>` : ""}
                        </div>
                    </div>
                    ${(val == "1") ? `<div id="ibBoardColumnHeaderFilterOption" class="ib-board-column-header-filter">
                    <div class="ib-board-column-head ib-board-column--head">
                        <div class="option-label-details ib-come-from-row">
                            <div class="option-ld-right">
                                <div class="option-ld-right-content">
                                    <div class="option-right-content-holder">
                                        <div class="ib-come-from-name">
                                            <label class="ib-filter-label">Macro</label>
                                            <input type="text" id="macroSuggestion" onkeyup="getSuggestion('macroSuggestion', '1')"  class="ib-filter-first-option" autocomplete="off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="option-ld-right">
                                <div class="option-ld-right-content">
                                    <div class="option-right-content-holder">
                                        <div class="ib-come-from-name">
                                            <label class="ib-filter-label">Micro</label>
                                            <input type="text" id="microSuggestion" onkeyup="getSuggestion('microSuggestion', '3')" class="ib-filter-first-option" autocomplete="off"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>` : ""}
                    <div class="ib-board-column-sc ib-mt-8">
                        <div class="ib-bc-sc-scrollable ib-scrollable-container-max-height nc-scrollbar">
                            <input type="hidden" value="5" class="nc-skip-value" />
                            <input type="hidden" value="${id_div}" class="nc-div-id" />
                            <div class="ib-bc-sc-cardsList">
                                <div class="ib-bc-sl-card-container ib-bc-sl-card-container--column" id="${id_div}" data-draggable="target">`
                                    for(index in key) 
                                    { 
                                        let img = '';
                                        let {_id, description, created_on, idea_stage, img_path}  = key[index];

                                        created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY')

                                        if (img_path.length > 0) {
                                            img = `<img class="img-fluid" src="/${img_path[0]}" />`;
                                        }
                                        html +=   `<div class="text-row ib-bc-sl-sic droppablesSelector ui-sortable-handle" onclick="rawModal('${_id}')" id="cardID${_id}" data-idea-id="${_id}" data-toggle="modal" data-target=".add-new-idea-modal">
                                            <div class="ib-sortable-item">
                                                <div class="ib-sort-item-cont">
                                                    <div class="ib-base-card">
                                                        <div class="ib-base-card-layout" data-toggle="modal" data-target=".add-new-idea-modal">
                                                            <div class="ib-base-card-layout-content">
                                                                <div class="ib-base-card-layout-img">
                                                                    ${img}
                                                                </div>
                                                                <div class="ib-base-card-layout-title">
                                                                    <span class="ib-base-card-layout-title--indented ${(idea_stage == 1) ? 'n-indented' : '' } ">
                                                                    ${(val == 1) ? `<div class="ib-card-selection" data-toggle="tooltip" data-placement="top" title="Select to merge idea">
                                                                         <svg class="svg-icon ib-check-icon" focusable="false" viewBox="0 0 512 512">
                                                                             <g transform="translate(0,512) scale(0.100000,-0.100000)" stroke="none">
                                                                                 <path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m539 -426 c458 -67 874 -277 1206 -609 283 -284 472 -615 570 -1004 81 -321 81 -701 0 -1022 -98 -389 -287 -720 -570 -1004 -334 -334 -742 -540 -1215 -611 -156 -24 -444 -24 -600 0 -474 72 -880 277 -1217 613 -331 332 -538 742 -609 1213 -24 156 -24 444 0 600 71 473 277 881 611 1215 370 370 840 586 1370 629 91 7 345 -4 454 -20z"/>
                                                                                 <path d="M3495 3433 c-82 -18 -89 -24 -702 -636 l-613 -611 -227 226 c-233 232 -279 267 -348 268 -125 0 -230 -119 -210 -239 4 -22 19 -59 35 -83 16 -24 165 -179 332 -344 286 -285 306 -303 358 -318 63 -19 108 -14 165 19 52 31 1398 1379 1421 1425 27 52 24 135 -6 190 -38 68 -137 118 -205 103z"/>
                                                                             </g>
                                                                         </svg>
                                                                     </div>` : ""}
                                                                        <span class="ib-base-card-task-name ib-fs-12" id="descid${_id}">${description}</span>
                                                                    </span>
                                                                    <div class="ib-base-card-layout-complete-show d-none">
                                                                        <div class="ib-base-card-layout-complete-task-row-complete-status">
                                                                            <svg class="circle-check-icon-small circle-check-icon" focusable="false" viewBox="0 0 32 32">
                                                                            <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class=""></path>
                                                                            <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class=""></path>
                                                                            </svg>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="ib-bcl-cpt"></div>
                                                                <div class="ib-bcl-action-options">
                                                                    <div class="ib-bcl-idea-date">
                                                                        <span class="cmmt-count-and-icon ib-common-gray">${created_on}</span>
                                                                    </div>
                                                                    <div class="ib-bcl-asign-handle ib-visibility-off">
                                                                        <div class="user-avatar asign-user-avatar">
                                                                            <div class="avatar-img avatar-img-wh"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="ib-bcl-cmmt-action-btn ib-visibility-off">
                                                                        <span class="cmmt-count-and-icon cmmt-ci-gray">3
                                                                            <svg class="cmmt-icon ib-ml-4" focusable="false" viewBox="0 0 24 24">
                                                                                <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                                                                            </svg>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
                                        } 
                    html += `</div></div></div>`
                    if(val == 1){
                        html += `<div class="ib-cards-option"><div class="ib-card-option-group"><span class="ib-common-btn ib-merge-btn" onclick="appendMerge()" data-target=".merge-ideas-modal" data-toggle="modal">Merge Selected Ideas</span></div></div>`
                    }
                    html +=  `</div></div></div></div>`;
        });

        return res.json({ 
            status : 1,
            message : "Success",
            data : html 
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/delete_idea', ajaxSession, async(req, res) => {
    try {
        const { idea_id, option } = req.body;
        if (option == "true") {
            const delete_idea = await deleteQuery('raw_idea', { _id: idea_id }, "1");
            return res.json({
                status: 1,
                message: 'Idea Deleted Successfully!!!',
                data: delete_idea
            });
        } else {
            const findIdea = await findQuery('raw_idea', { _id: idea_id }, "2", 0, 0, {});
            const { img_path, description, created_on, detail, arn_id, deskType, idea_relation, timestamp } = findIdea;
            const con_idea = {
                img_path: img_path,
                created_on: created_on,
                description: description,
                detail: detail,
                deskType: deskType,
                idea_relation: idea_relation,
                arn_id: arn_id,
                timestamp: timestamp,
                deleted_on: moment().format('DD/MM/YYYY')
            }
            await insertquery('later_idea', con_idea, "1");
            await deleteQuery('raw_idea', { _id: idea_id }, "1");
            return res.json({
                status: 1,
                message: 'Idea Moved Successfullyy!!!'
            });
        }
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error : ${error.toString()}`
        })
    }
});

router.get('/get_macro', ajaxSession, async(req, res) => {
    try {
        const list_data = await findQuery('macrosections', {}, "1", 0, 0, {});
        // const stage_data = await findQuery('stages', { default : true, flag : { $ne : 1 } }, "1", 0, 0, {stage_name : 1});
     
        let html = '<option value="null">Select Macro</option>';
        let arr_data = {};
        for (index in list_data) {
            let { macro_section_name, micro_section_name } = list_data[index];
            html += `<option value="${macro_section_name}"> ${ macro_section_name } </option>`;
            arr_data[macro_section_name] = micro_section_name;
        }

        // let stage_option = '';
        // for(index1 in stage_data)
        // {
        //     const {stage_name, _id} = stage_data[index1];
        //     stage_option += `<option value="${_id}">${stage_name}</option>`
        // }

        return res.json({
            status: 1,
            message: "Success",
            // stage_drop : stage_option,
            data: html,
            data_arr: arr_data
        });
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error : ${error.toString()}`
        });
    }
});

router.post('/get_idea', ajaxSession, async(req, res) => {
    try {
        const { idea_id, condition} = req.body;
        let idea = '';
        let modal_name = '';
        let filedName = '';
        let case_type = ''
        let html = '';
        switch (condition) {
            case "1":
                modal_name = 'raw_idea';
                case_type = "2";
                break;
            case "2":
                modal_name = 'merged_idea';
                case_type = "5";
                filedName = 'secondry_task';
                break;
            default:
                idea = {}
                break;
        }

        idea = await findQuery(modal_name, { _id: idea_id }, case_type, 0, 0, {}, filedName);

        if(condition == "2"){
            html =  await createHtml(idea)
        }

        return res.json({
            status: 1,
            message: 'Success',
            data: idea,
            htmlData : html
        })
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error : ${error.toString()}`
        });
    }
});

router.post('/update_raw_idea', ajaxSession, async(req, res) => {
    try {
        const { update_data, case_stat, _id } = req.body;
        let update = '';
        let whereData = { _id: _id };
        let queryType = '1';
        let stageData = '';
        switch (case_stat) {
            case '0':
                update = { $set: { description: update_data } }
                break;
            case '1':
                update = { $set: { detail: update_data } }
                break;
            case '2':
                update = { $set: { macro_Section_name: update_data} }
                break;
            case '3':
                update = { $set: { micro_section_name: update_data } }
                break;
            case '4':
                update = { $set: { priority_level: update_data } }
                break;
            case '5':
                update = { $set: { sales_importance: update_data } }
                break;
            case '6':
                update = { $set: { client_benefit: update_data } }
                break;
            case '7':
                update = { $set: { time_duration: update_data } }
                break;
            default:
                update = { $set: { idea_stage: update_data } }
                break;
        }

        const updateData = await updateQuery('raw_idea', whereData, update, queryType);
        
        return res.json({
            status: 1,
            message: 'Success',
            data: updateData,
            stage : stageData
        });
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error ${error.toString()}`
        });
    }
});

router.post('/update_drag', ajaxSession, async(req, res) => {
    try {

        const userInfo =  req.session.details;
        const { status_id, stage_id, idea_id, next_stage_id } = req.body;

        const check =  await findQuery('merged_idea', { _id : idea_id }, '2')
        const { secondry_task, primary_task } = check;
        secondry_task.push(primary_task)

        const where = { _id: { $in: secondry_task } }
        const updateData = { $set : { idea_stage : status_id } }
        const updateRet = await updateQuery('raw_idea', where, updateData, 'default' );

        // let update = { $set: { idea_stage: status_id } }
        // let whereData = { _id: idea_id };
        // const updateData = await updateQuery('raw_idea', whereData, update, '1');

        update = { $pull: { "ideas_under": idea_id } };
        whereData = { _id: stage_id };
        const pullStage = await updateQuery('stages', whereData, update, '1');

        whereData = { _id: next_stage_id };
        // const findStage = await findQuery('stages', whereData, "2", 0, 0, { _id : 0, stage_name : 1, department_name : 1 })

        

       
        update = { $push: { "ideas_under": idea_id } };
        const pushStage = await updateQuery('stages', whereData, update, '2');

        // console.log(pushStage)

        const discussData = {
            comment_by : userInfo.name,
            comment_by_id : userInfo._id,
            comment_type : 0,
            comment : `<b>${userInfo.name} Moved This Task to ${pushStage.stage_name} </b>`,
            date : moment().format('DD/MM/YYYY hh:mm a')
        };

        update = { $push: { "idea_discussion": discussData } };
        await updateQuery('merged_idea', { _id : idea_id }, update, '1');

        return res.json({
            status: 1,
            message: "Success",
            idea: updateRet,
            drag_from: pullStage,
            drag_to: pushStage
        });
    } catch (error) {
        return res.json({
            status: 0,
            message: `Server Error ${error.toString()}`
        });
    }
});

router.post('/get_suggestion', ajaxSession, async(req, res)=>{
    try {
        const { term, condition } = req.body;
        let searchData ; let searchQuery;

        switch (condition) {
            case "1":
                searchQuery = { macro_section_name : { $regex: term.toUpperCase() } };
                searchData = await findQuery('macrosections', searchQuery, "1", 0, 0, { macro_section_name : 1, micro_section_name: 1, _id : 1 })
                break;
            case "2":
                searchQuery = { username : { $regex: term } };
                searchData = await findQuery('Employee', searchQuery, "1", 0, 0, { username : 1 });
                break;
            case "3":
                searchQuery = { stage_name : { $regex: term } };
                searchData = await findQuery('stages', searchQuery, "1", 0, 0, { stage_name : 1 });
                break;
            default:
                break;
        }
  
        res.json({
            status : 1,
            message : "Success",
            data : searchData,
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/getRelatedIdeas', ajaxSession, async(req, res)=>{
    try {
        const {macro_v, micro_v, stageId} = req.body;
        const cond = {macro_Section_name : macro_v, micro_section_name : micro_v , idea_stage : 1}
        const findIdeas = await findQuery('raw_idea', cond, "1", 0, 0, {_id :1, description:1, created_on:1, img_path :1});
        let html = '';
        if(findIdeas.length > 0){
            for(index in findIdeas){
                let { _id, description, created_on, img_path} = findIdeas[index];
                created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY')
                html += `<div class="text-row ui-sortable-handle ib-bc-sl-sic droppablesSelector" onclick="rawModal('${_id}')" id="cardID${_id}" data-idea-id="${_id}" data-stage-id="${stageId}" data-target=".common-modal" data-toggle="modal">
                        <div class="ib-sortable-item">
                            <div class="ib-sort-item-cont">
                                <div class="ib-base-card">
                                    <div class="ib-base-card-layout">
                                        <div class="ib-base-card-layout-content">
                                            <div class="ib-base-card-layout-img">
                                                ${(img_path.length > 0) ? `<img class="img-fluid" src="${img_path}" />`:""}
                                            </div> 
                                            <div class="ib-base-card-layout-title">
                                                <span class="ib-base-card-layout-title--indented n-indented ">
                                                    <div class="ib-card-selection" data-toggle="tooltip" data-placement="top" title="Select to merge idea">
                                                        <svg class="svg-icon ib-check-icon" focusable="false" viewBox="0 0 512 512">
                                                            <g transform="translate(0,512) scale(0.100000,-0.100000)" stroke="none">
                                                                <path d="M2330 5110 c-494 -48 -950 -230 -1350 -538 -195 -150 -448 -432 -594 -662 -63 -99 -186 -351 -230 -471 -49 -134 -102 -340 -128 -499 -31 -195 -31 -565 0 -760 45 -276 116 -498 237 -745 132 -269 269 -460 489 -681 221 -220 412 -357 681 -489 247 -121 469 -192 745 -237 195 -31 565 -31 760 0 276 45 498 116 745 237 269 132 460 269 681 489 220 221 357 412 489 681 88 179 132 296 180 476 63 240 78 371 78 649 0 278 -15 409 -78 649 -48 180 -92 297 -180 476 -132 269 -269 460 -489 681 -221 220 -412 357 -681 489 -246 121 -474 193 -740 235 -147 23 -475 34 -615 20z m539 -426 c458 -67 874 -277 1206 -609 283 -284 472 -615 570 -1004 81 -321 81 -701 0 -1022 -98 -389 -287 -720 -570 -1004 -334 -334 -742 -540 -1215 -611 -156 -24 -444 -24 -600 0 -474 72 -880 277 -1217 613 -331 332 -538 742 -609 1213 -24 156 -24 444 0 600 71 473 277 881 611 1215 370 370 840 586 1370 629 91 7 345 -4 454 -20z"/>
                                                                <path d="M3495 3433 c-82 -18 -89 -24 -702 -636 l-613 -611 -227 226 c-233 232 -279 267 -348 268 -125 0 -230 -119 -210 -239 4 -22 19 -59 35 -83 16 -24 165 -179 332 -344 286 -285 306 -303 358 -318 63 -19 108 -14 165 19 52 31 1398 1379 1421 1425 27 52 24 135 -6 190 -38 68 -137 118 -205 103z"/>
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <span class="ib-base-card-task-name ib-fs-12" id="descid${_id}">${description}</span>
                                                </span>
                                                <div class="ib-base-card-layout-complete-show d-none">
                                                    <div class="ib-base-card-layout-complete-task-row-complete-status">
                                                        <svg class="circle-check-icon-small circle-check-icon" focusable="false" viewBox="0 0 32 32">
                                                        <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class=""></path>
                                                        <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class=""></path>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="ib-bcl-cpt"></div>
                                            <div class="ib-bcl-action-options">
                                                <div class="ib-bcl-idea-date">
                                                    <span class="cmmt-count-and-icon ib-common-gray"> ${created_on} </span>
                                                </div>
                                                <div class="ib-bcl-asign-handle ib-visibility-off">
                                                    <div class="user-avatar asign-user-avatar">
                                                        <div class="avatar-img avatar-img-wh"></div>
                                                    </div>
                                                </div>
                                                <div class="ib-bcl-cmmt-action-btn ib-visibility-off">
                                                    <span class="cmmt-count-and-icon cmmt-ci-gray">
                                                        3
                                                        <svg class="cmmt-icon ib-ml-4" focusable="false" viewBox="0 0 24 24">
                                                        <path d="M4.2,24.1c-0.2,0-0.3,0-0.5-0.1c-0.3-0.2-0.5-0.5-0.5-0.9v-5.2C1.1,16.1,0,13.7,0,11c0-5,4-9,9-9h6c5,0,9,4,9,9 c0,5-4,9-9,9h-4.1l-6.3,3.9C4.5,24,4.3,24.1,4.2,24.1z M9,4c-3.9,0-7,3.1-7,7c0,2.2,1,4.2,2.8,5.6C5,16.8,5.2,17,5.2,17.4v3.9 l5-3.1c0.2-0.1,0.3-0.2,0.5-0.2H15c3.9,0,7-3.1,7-7c0-3.9-3.1-7-7-7H9z"></path>
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
            }
        }

        return res.json({
            status : 1,
            message : "Success",
            data :  html
        })
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/merge_idea', ajaxSession, async(req, res)=>{
    try {

        const userInfo =  req.session.details;

        const { primary_taskId, secondry_taskIds, idea_stage, title } = req.body;

        const checkStage = await findQuery('stages',{ _id : idea_stage }, "2", 0, 0, { });
        let { _id, flag, stage_id = null, stage_name } = checkStage;

        if(stage_id == null){ 
            stage_id = _id;
        }

        const arrayFinal = [];
        for (index in secondry_taskIds) {
            let putData = secondry_taskIds[index];
            const idea_id = putData.id;
            if(idea_id != primary_taskId){
                arrayFinal.push(idea_id);
            }
        }

        const insert_data = {
            primary_task_title: title,
            primary_task : primary_taskId,
            secondry_task: arrayFinal,
            assigned_to: stage_id,
            assigned_by: userInfo._id,
            idea_discussion : [{
                    comment_by : userInfo.name,
                    comment_by_id : userInfo._id,
                    comment_type : 0,
                    comment : `<b>${userInfo.name} created this task & assigned to ${stage_name} </b>`,
                    date : moment().format('DD/MM/YYYY hh:mm a')
                }],
            created_on : moment().format('DD/MM/YYYY hh:mm a')
        }

        const merge_data = await insertquery('merged_idea', insert_data, "default" );

        arrayFinal.push(primary_taskId)
        const where = { _id: { $in: arrayFinal } }
        const updateData = { $set : { idea_stage : flag } }
        await updateQuery('raw_idea', where, updateData, 'default' );

        const where_stage = { _id : _id };
        const push_data = { $push : { ideas_under : merge_data[0]._id } }
        await updateQuery('stages', where_stage, push_data, '1')

        return res.json({
            status : 1,
            message : "Ideas Merged Successfully"
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.post('/post_comment', ajaxSession, async(req, res)=>{
    try {
        const { comment, merge_id } = req.body;
        const { name, _id  } = req.session.details;

        const data = {
            comment_by : name,
            comment_by_id : _id,
            comment_type : 1,
            comment : comment,
            date : moment().format('DD/MM/YYYY hh:mm a')
        }

        const where = { _id : merge_id };
        const updateData = { $push : {
            idea_discussion : data
        }}
        const post_data = await updateQuery('merged_idea', where, updateData, '2');

        const last_cmnt = [...post_data.idea_discussion].pop();
        let date = last_cmnt.date;
        date = moment(date, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY');

        const comment_html = `<!-- logs area -->
        <div class="ib-options-group ib-idea-log-container" id="${last_cmnt._id}">
            <div class="option-label-details ib-come-from-row mt-3">
                <div class="ib-log-container">
                    <div class="ib-log-row">
                        <div class="ib-log-status-item">
                            <div class="ib-log-status-title">
                                <div class="ib-log-title-text ib-log-title-text-styl">
                                    <b class="ib-ml-4">${last_cmnt.comment_by}</b>
                                </div>
                                <div class="ib-log-date ib-log-date-styl">${date}</div>
                            </div>
                            <div class="ib-log-status-text-content">
                                <div class="ib-log-text-content-text">${last_cmnt.comment}</div>
                            </div>
                        </div>
                        <div class="ib-log-card-status">
                            <div class="ib-log-card-status-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- logs area end-->`

        return res.json({
            status : 1,
            message : "Success",
            data : post_data,
            html : comment_html
        });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

module.exports = router;

async function createHtml(data){

    const { _id, assigned_by, assigned_to, idea_discussion, idea_docs, secondry_task, primary_task} = data;
    let { arn_id, created_on, description, deskType, detail, macro_Section_name, idea_stage, micro_section_name } = primary_task
    let className = '';
    let stage= idea_stage;
    created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY')
    switch (stage.toString()) {
        case '3':
            className = 'first-complete';
            break;
        case '4':
            className = 'second-complete';
            break;
        case '5':
            className = 'third-complete';
            break;
        case '6':
            className = 'fourth-complete';
            break;
        default:
            className = 'fifth-complete';
            break;
    }

    let html = `<div class="ib-mm-inner-container">
    <div class="ib-modal-header ib-modal-header-shadow">
        <div class="ib-header-toolbar ib-header-toolbar-spreadsheet">
            <div class="ib-header-title">
                <div class="ib-header-title-row">
                    <div class="ib-header-title-row-status">
                        <svg class="circle-check-icon circle-check-icon-small circle-check-icon-small-task-completion-icon circle-check-icon-small-incompleted" focusable="false" viewBox="0 0 32 32"><!-- circle-check-icon-small-completed  -->
                        <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z" class="compound-icon-outer"></path>
                        <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                        </svg>
                    </div>
                    <div class="ib-header-title-row-text">${description}</div>
                    <input type="hidden" id="mergeId" value="${_id}">
                </div>
            </div>
            <span class="ib-modal-closer ib-modal-closer-style">
                <svg class="ib-modal-closer-icon" focusable="false" viewBox="0 0 32 32">
                <path d="M19,32c-3.9,0-7-3.1-7-7V10c0-2.2,1.8-4,4-4s4,1.8,4,4v9c0,0.6-0.4,1-1,1s-1-0.4-1-1v-9c0-1.1-0.9-2-2-2s-2,0.9-2,2v15c0,2.8,2.2,5,5,5s5-2.2,5-5V10c0-4.4-3.6-8-8-8s-8,3.6-8,8v5c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5C6,4.5,10.5,0,16,0s10,4.5,10,10v15C26,28.9,22.9,32,19,32z"></path>
                </svg>
            </span>
            <span class="ib-modal-closer ib-modal-closer-style" data-dismiss="modal" aria-label="Close">
                <svg class="ib-modal-closer-icon" focusable="false" viewBox="0 0 24 24">
                <path d="M14.5,12l6-6C20.8,5.7,21,5.2,21,4.8s-0.2-0.9-0.5-1.2C20.1,3.2,19.7,3,19.2,3S18.3,3.2,18,3.5l-6,6l-6-6 C5.7,3.2,5.2,3,4.8,3S3.9,3.2,3.5,3.5C3.2,3.9,3,4.3,3,4.8S3.2,5.7,3.5,6l6,6l-6,6c-0.7,0.7-0.7,1.8,0,2.5C3.9,20.8,4.3,21,4.8,21 s0.9-0.2,1.2-0.5l6-6l6,6c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"></path>
                </svg>
            </span>
        </div>
        <div class="ib-header-separater"></div>
    </div>
    <div class="ib-modal-body ib-modal-body-styl">
        <div class="ib-modal-body-main-container ib-modal-body-main-vertical-scroll ib-modal-body-main-container-styl ib-modal-body-main-container-styl-ie-not">
            <div class="ib-modal-body-element-section">
                <div class="ib-task-status-modal">
                    <div class="ib-task-status-container">
                        <div class="ib-task-status-item">
                            <div class="ib-task-status ${className}" id="primary_stage">
                                <div class="ib-task-stage">
                                    <div class="ib-task-stage-item">
                                        <div class="ib-task-tracker-point">
                                            <div class="ib-track-text">
                                                <div class="ib-point-txt-container">
                                                    <span class="ib-track-point-text">Approved</span>
                                                </div>
                                            </div>
                                            <span class="ib-task-stage-icon first-track-point">
                                                <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                    <i class="ib-task-dot"></i>
                                                </span>
                                            <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="ib-task-tracker-point">
                                            <div class="ib-track-text">
                                                <div class="ib-point-txt-container">
                                                    <span class="ib-track-point-text">UI Design</span>
                                                </div>
                                            </div>
                                            <span class="ib-task-stage-icon second-track-point">
                                                <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                    <i class="ib-task-dot"></i>
                                                </span>
                                            <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="ib-task-tracker-point">
                                            <div class="ib-track-text">
                                                <div class="ib-point-txt-container">
                                                    <span class="ib-track-point-text">Under Development</span>
                                                </div>
                                            </div>
                                            <span class="ib-task-stage-icon third-track-point">
                                                <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                    <i class="ib-task-dot"></i>
                                                </span>
                                            <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="ib-task-tracker-point">
                                            <div class="ib-track-text">
                                                <div class="ib-point-txt-container">
                                                    <span class="ib-track-point-text">Under Testing Phase</span>
                                                </div>
                                            </div>
                                            <span class="ib-task-stage-icon fourth-track-point">
                                                <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                    <i class="ib-task-dot"></i>
                                                </span>
                                            <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                </svg>
                                            </span>
                                        </div>
                                        <div class="ib-task-tracker-point">
                                            <div class="ib-track-text">
                                                <div class="ib-point-txt-container">
                                                    <span class="ib-track-point-text">Ready To Live</span>
                                                </div>
                                            </div>
                                            <span class="ib-task-stage-icon fifth-track-point">
                                                <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                    <i class="ib-task-dot"></i>
                                                </span>
                                            <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div class="ib-task-track">
                                    <div class="ib-task-track-activity-bar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ib-options-group">
                    <div class="option-label-details ib-come-from-row">
                        <div class="option-ld-left option-label-width">
                            <div class="label-container">
                                <label class="label-tag"><b>Idea Related with</b></label>
                            </div>
                        </div>
                        <div class="option-ld-right">
                            <div class="option-ld-right-content">
                                <div class="relation-to-selection-holder related-type-selection">
                                    <select id="relatedTypeSelection" class="ib-related-with-options ib-related-target">
                                        <option>Wealth Elite Software</option>
                                        <option>Advisor App</option>
                                        <option>Investor App</option>
                                        <option>Website</option>
                                    </select>
                                    <label class="selection-option-down-arrow">
                                        <svg class="selection-down-arrow" focusable="false" viewBox="0 0 24 24">
                                        <path d="M3.5,8.9c0-0.4,0.1-0.7,0.4-1C4.5,7.3,5.4,7.2,6,7.8l5.8,5.2l6.1-5.2C18.5,7.3,19.5,7.3,20,8c0.6,0.6,0.5,1.5-0.1,2.1 l-7.1,6.1c-0.6,0.5-1.4,0.5-2,0L4,10.1C3.6,9.8,3.5,9.4,3.5,8.9z"></path>
                                        </svg>
                                    </label>
                                </div>
                                <span class="ib-related-option-cross ib-related-option-cross-style ib-visibility-off">
                                    <svg class="ib-common-cross-icon" focusable="false" viewBox="0 0 24 24">
                                    <path d="M14.5,12l6-6C20.8,5.7,21,5.2,21,4.8s-0.2-0.9-0.5-1.2C20.1,3.2,19.7,3,19.2,3S18.3,3.2,18,3.5l-6,6l-6-6 C5.7,3.2,5.2,3,4.8,3S3.9,3.2,3.5,3.5C3.2,3.9,3,4.3,3,4.8S3.2,5.7,3.5,6l6,6l-6,6c-0.7,0.7-0.7,1.8,0,2.5C3.9,20.8,4.3,21,4.8,21 s0.9-0.2,1.2-0.5l6-6l6,6c0.3,0.3,0.8,0.5,1.2,0.5s0.9-0.2,1.2-0.5c0.7-0.7,0.7-1.8,0-2.5L14.5,12z"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                    <!-- date area -->
                    <div class="option-label-details ib-come-from-row">
                        <div class="option-ld-left option-label-width">
                            <div class="label-container">
                                <label class="label-tag"><b>Due Date</b></label>
                            </div>
                        </div>
                        <div class="option-ld-right">
                            <div class="option-ld-right-content">
                                <div class="due-date-seletor-container">
                                    <div class="celander-icon-holder">
                                        <svg class="ib-celander-icon" focusable="false" viewBox="0 0 32 32">
                                        <path d="M24,2V1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H10V1c0-0.6-0.4-1-1-1S8,0.4,8,1v1C4.7,2,2,4.7,2,8v16c0,3.3,2.7,6,6,6h16c3.3,0,6-2.7,6-6V8C30,4.7,27.3,2,24,2z M8,4v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4h12v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4c2.2,0,4,1.8,4,4v2H4V8C4,5.8,5.8,4,8,4z M24,28H8c-2.2,0-4-1.8-4-4V12h24v12C28,26.2,26.2,28,24,28z"></path>
                                        </svg>
                                    </div>
                                    <div class="due-date-viewer">
                                        <span>${created_on}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- date area end-->
                    <!-- Description area -->
                    <div class="option-label-details ib-come-from-row">
                        <div class="option-ld-left option-label-width">
                            <div class="label-container">
                                <label class="label-tag"><b>Description</b></label>
                            </div>
                        </div>
                        <div class="option-ld-right">
                            <div class="option-ld-right-content">
                                <div class="ib-task-description-area">
                                    <div id="textEditor2" id-data="2" class="text-editor-2 text-editor-remove-style text-editor-2-max-height text-editor-2-active">
                                        <div class="text-editable-area" tabindex="0" contenteditable="true">${detail}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Description area end-->
                    <div class="ib-task-pane-subtasks-label">
                        <div class="ib-task-pane-left ib-text-left">
                            <div class="ib-task-pane-left-label-container">
                                <label class="ib-task-pane-left-label"><b>Ideas</b></label>
                            </div>
                        </div>
                    </div>`
                for(index in secondry_task){
                    let { arn_id, created_on, description, deskType, detail, _id, idea_stage} = secondry_task[index]
                    created_on = moment(created_on, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY');
                    switch (idea_stage.toString()) {
                        case '3':
                            className = 'first-complete';
                            break;
                        case '4':
                            className = 'second-complete';
                            break;
                        case '5':
                            className = 'third-complete';
                            break;
                        case '6':
                            className = 'fourth-complete';
                            break;
                        default:
                            className = 'fifth-complete';
                            break;
                    }

                    html += `<div class="ib-new-idea-item-row ib-added-new-task-row">
                    <div class="ib-added-item-row-column">
                        <div class="ib-added-item-number ib-added-item-number-with-margin">${parseInt(index) + 1}</div>
                        <div class="ib-sub-task-content">
                            <div class="ib-sub-task-editable-title" contenteditable="true">${description}</div>
                        </div>
                        <div class="ib-sub-task-due-date-seletor-container">
                            <div class="celander-icon-holder">
                                <svg class="ib-celander-icon" focusable="false" viewBox="0 0 32 32">
                                <path d="M24,2V1c0-0.6-0.4-1-1-1s-1,0.4-1,1v1H10V1c0-0.6-0.4-1-1-1S8,0.4,8,1v1C4.7,2,2,4.7,2,8v16c0,3.3,2.7,6,6,6h16c3.3,0,6-2.7,6-6V8C30,4.7,27.3,2,24,2z M8,4v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4h12v1c0,0.6,0.4,1,1,1s1-0.4,1-1V4c2.2,0,4,1.8,4,4v2H4V8C4,5.8,5.8,4,8,4z M24,28H8c-2.2,0-4-1.8-4-4V12h24v12C28,26.2,26.2,28,24,28z"></path>
                                </svg>
                            </div>
                            <div class="due-date-viewer">
                                <span>${created_on}</span>
                            </div>
                        </div>
                        <span class="ib-modal-closer ib-modal-closer-style">
                            <svg class="ib-modal-closer-icon" focusable="false" viewBox="0 0 32 32">
                            <path d="M19,32c-3.9,0-7-3.1-7-7V10c0-2.2,1.8-4,4-4s4,1.8,4,4v9c0,0.6-0.4,1-1,1s-1-0.4-1-1v-9c0-1.1-0.9-2-2-2s-2,0.9-2,2v15c0,2.8,2.2,5,5,5s5-2.2,5-5V10c0-4.4-3.6-8-8-8s-8,3.6-8,8v5c0,0.6-0.4,1-1,1s-1-0.4-1-1v-5C6,4.5,10.5,0,16,0s10,4.5,10,10v15C26,28.9,22.9,32,19,32z"></path>
                            </svg>
                        </span>
                        <div class="ib-sub-task-item-expand-icon ib-expand-trigger" data-toggle="collapse" data-target="#cll${_id}" aria-expanded="false" aria-controls="cll${_id}">
                            <svg class="ib-arrow-icon ib-arrow-right" focusable="false" viewBox="0 0 32 32">
                            <path d="M23.2,16c0,0.3-0.1,0.7-0.3,0.9l-9,11c-0.5,0.6-1.5,0.7-2.1,0.2s-0.7-1.5-0.2-2.1l8.2-10L11.6,6c-0.5-0.6-0.4-1.6,0.2-2.1s1.6-0.4,2.1,0.2l9,11C23.1,15.3,23.2,15.7,23.2,16z"></path>
                            </svg>
                        </div>
                    </div>
                    <div id="cll${_id}" class="collapse multi-collapse ib-sub-task-description-container flex-column">
                        <div class="ib-task-des-editable-container">
                            <div class="ib-task-status-modal">
                                <div class="ib-task-status-container">
                                    <div class="ib-task-status-item">
                                        <div class="ib-task-status ${className}">
                                            <div class="ib-task-stage">
                                                <div class="ib-task-stage-item">
                                                <div class="ib-task-tracker-point">
                                                <div class="ib-track-text">
                                                    <div class="ib-point-txt-container">
                                                        <span class="ib-track-point-text">Approved</span>
                                                    </div>
                                                </div>
                                                <span class="ib-task-stage-icon first-track-point">
                                                    <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                        <i class="ib-task-dot"></i>
                                                    </span>
                                                <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="ib-task-tracker-point">
                                                <div class="ib-track-text">
                                                    <div class="ib-point-txt-container">
                                                        <span class="ib-track-point-text">UI Design</span>
                                                    </div>
                                                </div>
                                                <span class="ib-task-stage-icon second-track-point">
                                                    <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                        <i class="ib-task-dot"></i>
                                                    </span>
                                                <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="ib-task-tracker-point">
                                                <div class="ib-track-text">
                                                    <div class="ib-point-txt-container">
                                                        <span class="ib-track-point-text">Under Development</span>
                                                    </div>
                                                </div>
                                                <span class="ib-task-stage-icon third-track-point">
                                                    <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                        <i class="ib-task-dot"></i>
                                                    </span>
                                                <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="ib-task-tracker-point">
                                                <div class="ib-track-text">
                                                    <div class="ib-point-txt-container">
                                                        <span class="ib-track-point-text">Under Testing Phase</span>
                                                    </div>
                                                </div>
                                                <span class="ib-task-stage-icon fourth-track-point">
                                                    <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                        <i class="ib-task-dot"></i>
                                                    </span>
                                                <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                            <div class="ib-task-tracker-point">
                                                <div class="ib-track-text">
                                                    <div class="ib-point-txt-container">
                                                        <span class="ib-track-point-text">Ready To Live</span>
                                                    </div>
                                                </div>
                                                <span class="ib-task-stage-icon fifth-track-point">
                                                    <span class="ib-circle-check-icon task-in-process" focusable="false" viewbox="0 0 32 32">
                                                        <i class="ib-task-dot"></i>
                                                    </span>
                                                <svg class="circle-check-icon task-complete" focusable="false" viewBox="0 0 32 32">
                                                    <path d="M31,16c0,8.3-6.7,15-15,15S1,24.3,1,16S7.7,1,16,1S31,7.7,31,16z"></path>
                                                    <path d="M13.4,22.1c-0.3,0-0.5-0.1-0.7-0.3l-3.9-3.9c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l3.1,3.1l8.1-8.1c0.4-0.4,1-0.4,1.4,0   s0.4,1,0,1.4l-8.9,8.9C13.9,22,13.7,22.1,13.4,22.1z" class="compound-icon-inner"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                                </div>
                                            </div>
                                            <div class="ib-task-track">
                                                <div class="ib-task-track-activity-bar"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="ib-task-des-editable-area" contenteditable="true">${detail}</div>
                        </div>
                        <div class="ib-new-idea-item-row ib-added-new-task-row">
                            <div class="ib-attachments-tile-container">
                                <div class="ib-attachments-tile-container-card-container">
                                    <a class="ib-attachment-image ib-attachment-image-small" href="#">
                                        <div class="ib-attachment-preview">
                                            <img class="ib-thumbnail-image" src="https://cimsec.org/wp-content/uploads/2016/06/r0Eh9Aw.png">
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;
                }
                html +=  `<!-- add new btn -->
                    <div class="option-label-details ib-come-from-row">
                        <div class="ib-add-new-task-target-button ib-add-new-task-add-sub-task-button">
                            <div class="add-sub-task-button">
                                <div class="ib-common-btn ib-add-sub-task-btn ib-add-sub-task-btn-styl" role="button" tabindex="0">
                                    <b><svg class="ib-plus-icon ib-mr-4" focusable="false" viewBox="0 0 24 24">
                                    <path d="M10,10V4c0-1.1,0.9-2,2-2s2,0.9,2,2v6h6c1.1,0,2,0.9,2,2s-0.9,2-2,2h-6v6c0,1.1-0.9,2-2,2s-2-0.9-2-2v-6H4c-1.1,0-2-0.9-2-2s0.9-2,2-2H10z"></path>
                                    </svg> Add New </b>
                                </div>
                            </div>
                        </div>
                    </div>
                <!-- add new btn end-->
                <!-- files area -->
                <div class="ib-new-idea-item-row ib-added-new-task-row mt-4 mx-0">
                    <div class="ib-attachments-tile-container">
                        <div class="ib-attachments-tile-container-card-container">
                            <div>
                                <a class="ib-attachment-image ib-attachment-image-small" href="#">
                                    <div class="ib-attachment-preview">
                                        <img class="ib-thumbnail-image" src="https://cimsec.org/wp-content/uploads/2016/06/r0Eh9Aw.png" />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- files area end-->
            </div><div id="comment_area">`
            for(index1 in idea_discussion){
                let { _id, comment_by, comment, comment_type, date } = idea_discussion[index1];
                date = moment(date, 'DD/MM/YYYY hh:mm a').format('Do MMM YYYY');
                html += `<!-- logs area -->
                <div class="ib-options-group ib-idea-log-container" id="${_id}">
                    <div class="option-label-details ib-come-from-row mt-3">
                        <div class="ib-log-container">
                            <div class="ib-log-row">
                                <div class="ib-log-status-item"><div class="ib-log-status-title">
                                        ${(comment_type == 1) ? `<div class="ib-log-title-text ib-log-title-text-styl"><b class="ib-ml-4">${comment_by}</b></div>` : ''}
                                    </div>
                                    <div class="ib-log-status-text-content">
                                        <div class="ib-log-text-content-text">${comment}</div>
                                        <div class="ib-log-date ib-log-date-styl">${date}</div>
                                    </div>
                                </div>
                                <div class="ib-log-card-status">
                                    <div class="ib-log-card-status-text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- logs area end-->`
            }
            html +=`</div></div>
            </div>
        </div>
        <div class="ib-modal-footer ib-modal-footer-shadow">
            <div class="ib-modal-footer-container">
                <div class="comment-composer comment-composer-spacing">
                    <div class="comment-composer-editor d-flex">
                        <div class="comment-composer-editor-sizing-layer comment-composer-editor-vertical comment-composer-editor-sizing w-100">
                            <div class="text-editor-2 ib-editor-text">
                                <div class="ib-editor-text-editor-placeholderWrapper">
                                    <div class="ib-typo-editor-truncate ib-editor-text-editor-placeholder">Write question & update…</div>
                                </div>
                                <div class="ib-editor ib-text-editor ib-editor-height" id="commentChnage" tabindex="0" contenteditable="true"></div>
                            </div>
                        </div>
                        <div class="p-1 text-right d-flex justify-content-end flex-column">
                            <span class="ib-btn ib-primary-btn post-btn">Post Comment</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    return html;
}