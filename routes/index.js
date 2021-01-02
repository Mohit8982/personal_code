const router = require("express").Router();
const { checkSession, loginSession } = require("../helper_function/session");
const { findQuery } = require('../services/crud_operation');
const _ = require('lodash');

router.get('/', loginSession, async (req, res)=>{
    try {
        return res.render('./login');
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.get('/admin', checkSession, async (req, res)=>{
    try {
        const userinfo = req.session.details;
        const raw_ideas = await findQuery('raw_idea', {}, "3", 10, 0, {});

        const grouped = _.groupBy(raw_ideas, function(raw_idea) {
            return raw_ideas.idea_stage;
        });
          

        return res.render('./index', { idea_data : raw_idea, userinfo : userinfo });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.get('/developer', checkSession, async (req, res)=>{
    try {
        const userinfo = req.session.details;
        const raw_idea = await findQuery('raw_idea', {}, "3", 10, 0, {});
        return res.render('./index', { idea_data : raw_idea, userinfo : userinfo });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.get('/UI_developer', checkSession, async (req, res)=>{
    try {
        const userinfo = req.session.details;
        const raw_idea = await findQuery('raw_idea', {}, "3", 10, 0, {});
        return res.render('./index', { idea_data : raw_idea, userinfo : userinfo });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.get('/tester', checkSession, async (req, res)=>{
    try {
        const userinfo = req.session.details;
        const raw_ideas = await findQuery('raw_idea', {idea_stage : 0 } , "3", 5, 0, {});
        const final_ideas = await findQuery('raw_idea', {  idea_stage : 1 }, "3", 5, 0, {});

        const merge_data = [...raw_ideas, ...final_ideas]

        const grouped = _.groupBy(merge_data, function(raw_idea) {
            return raw_idea.idea_stage;
        });
     
        return res.render('./index', { idea_data : raw_ideas, userinfo : userinfo, data : grouped });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

router.get('/profile', checkSession, async(req, res)=>{
    try {
        const userinfo = req.session.details;
        return res.render('./profile', {userinfo : userinfo });
    } catch (error) {
        return res.json({
            status : 0,
            message : `Server Error : ${error.toString()}`
        });
    }
});

module.exports = router;