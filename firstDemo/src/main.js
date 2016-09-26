var Vue = require('vue');

import $ from 'jquery'
import ticket from './components/ticket.vue'
import pricebox from './components/pricebox.vue'
import 

Vue.component('ticket', ticket);
Vue.component('pricebox',pricebox);

var vm = new Vue({
	el: 'body',
	data: {
		days: ['一','二', '三', '四', '五', '六', '日'],
		tickets: [
			{name: '飞马健身', price: '13.0', info: '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈', remain: '20'},
			{name: '莱茵体育', price: '23.0', info: '嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻嘻', remain: '10'}
		],
		select: [],
		checked: true
	},
	components: {
		ticket,
		pricebox
	},
	methods: {
		getTicketData: function(){
			$.ajax({
				url: '/mockdata/list.json',
				type: 'GET',
				dataType: 'json',
				cache: false,
				error: function(){},
				success: function(json){
					vm.tickets = json.infos.data;
				}
			})
		},
	},
	watch: {
		'tickets': function(newVal, oldVal){
			this.$broadcast('ticket-msg',this.tickets);
		}
	},
	 events: {
	 	'selected': function(msg){
	 		this.select = msg;
	 		this.$nextTick(function(){
	 			this.$broadcast('select-msg',this.select);
	 		})	
	 	},
	 	'checked': function(msg){
	 		this.checked = msg;
	 	}
	 }
})
