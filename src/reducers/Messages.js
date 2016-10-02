import moment from 'moment';
var _ = require('lodash');

const initialState = {
  messages: [],
  memoized: {},
  conversationid: null,
  channelError: true
};

const mockedInitialState = {
  conversationid: 354,
  channelError: false,
  memoized: {},
  messages: [],
  userCreatedNewMessage: false,
  serverMessages:  [
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:845,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:846,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"We normally answer within 60 minutes or less. Please leave your questions here and someone will be with you shortly.",
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:847,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"Let us notify you via email:",
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:848,
  sender_avatar:null,
  sender_name:"Alex (Bot)",
  text:"Enter your email",
  containsInputBox: true,
  bot: true,
  user_id:387
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:849,
  sender_avatar:null,
  sender_name:" ",
  text:"My package didn't arrive",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:850,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:851,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:852,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:853,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:854,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+1,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+2,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+3,
  sender_avatar:null,
  sender_name:" ",
  text:"13th Element",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+4,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+5,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+6,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+7,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+8,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+9,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+10,
  sender_avatar:null,
  sender_name:" ",
  text:"20th element",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+11,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+12,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+13,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+14,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+15,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+16,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+17,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+18,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+19,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+20,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+21,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+22,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+23,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:855+24,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:1,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:2,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:3,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:4,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:5,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:6,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:7,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:8,
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},
{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"Is this working?",
  user_id:400
},{
  conversation_id:297,
  created_at:"2016-09-27T02:55:45.774Z",
  id:Math.random(),
  sender_avatar:null,
  sender_name:" ",
  text:"end?",
  user_id:400
},
]}

export function messages(state = mockedInitialState, action) {
  switch (action.type) {
  case 'FETCH_MESSAGES':
    let messages = _.sortBy(action.posts.messages, a => (new Date()).getTime() - parseInt(moment(a.created_at).format("x"))).reverse();
    return {
      ...state,
      messages: messages,
      memoized: {
        ...state.memoized,
        [action.posts.conversationid]: messages
      }
    };
  case 'FETCH_MESSAGES_MEMOIZED':
    if(!state.memoized[action.posts.conversationid]) return state;
    return {
      ...state,
      messages: [ ...state.memoized[action.posts.conversationid]]
    };
    case 'SET_GUEST_GROUP_CONV_ID':
      return {
        ...state,
        conversationid: action.posts.conversationid
      };
  case 'ADD_MESSAGE':
    return {
      ...state,
      userCreatedNewMessage: true,
      messages: state.messages.concat(action.message),
      memoized: Object.assign({}, state.memoized, { [action.message.conversationid]: action.message })
    };
  case 'MESSAGE_STREAM':
    if(!action.posts.message.payload || !action.posts.message.payload.conversation_id || action.posts.message.payload.conversation_id != state.conversationid || state.messages.find(a => a.id == action.posts.message.payload.id)){
      return state;
    }
    let message = action.posts.message.payload,
      user = state.messages.find(a => a.user_id === message.user_id),
      updatedMessages;
    message.created_at = moment().format();
    if(user){
      message.sender_name = user.sender_name;
      message.sender_avatar = user.sender_avatar;
    }
    updatedMessages = [...state.messages, message];
    return {
      ...state,
      messages: updatedMessages,
      memoized: {
        ...state.memoized,
        [action.posts.conversationid]: updatedMessages
      }
    };
  case 'MESSAGE_ERROR':
    return {
      ...state,
      channelError: action.posts.flag
    };
  case 'LOAD_MSG_HISTORY':
    return {
      ...state, messages: action.messages.concat(state.messages)
    }
  case 'RESET_MESSAGES':
    return initialState;
  case 'PREPARE_TO_CREATE_NEW_CONVERSATION':
    return initialState;

  case 'SCROLL_COMPLETE_FOR_NEW_MESSAGE':
    return {...state, userCreatedNewMessage: false}
  default:
    return state;
  }
}
