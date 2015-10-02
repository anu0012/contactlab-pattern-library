Polymer({
	is: 'elekti-mer',
	properties: {
		label: {
			type: String,
			value: 'My label'
		},
		options: {
			type: Array,
			value: ['Option 1','Option 2']
		},
		default: {
			type: Number
		},
		value: {
			type: 'String',
			readonly: true
		},
		noSearch: {
			type: Boolean,
			value: false
		}
	},
	ready: function(){
		var thisComp = this;
		this.input = this.$$('#' + this.dashify(this.label));
		if(this.default || this.default === 0){
			thisComp.input.value = thisComp.options[thisComp.default];
			thisComp.activeInput('blur');
		};
		this.value = this.input.value;
	},
	dashify: function(str){
		return str.replace(/ /g,'-');
	},
	updateValue: function(){
		this.value = this.input.value;
	},
	highlightedElement: function(){
		var search = this.input.value.toLowerCase();
		var elems = this.$.list.querySelectorAll('li');
		for(var i = 0; i < elems.length; i++){
			var str = elems[i].innerHTML;
			((search !== '') && (str.toLowerCase() === search) ) ? elems[i].classList.add('selected') : elems[i].classList.remove('selected');
		}
	},
	activeInput: function(type){
		if(type === 'blur' && this.input.value !== ""){
			this.input.classList.add('active');
		}else{
			this.input.classList.remove('active');
		}
	},
	selectElement: function(evt){
		this.input.value = evt.target.innerHTML;
		this.activeInput('blur');
	},
	handleListVisibility: function(evt){
		this.input.classList.add('active');
		var thisComp = this;
		setTimeout(function(){
			thisComp.$.list.classList.toggle('visible');
			thisComp.highlightedElement();
		},150);
		this.activeInput(evt.type);
	},
	dropOnly: function(){
		var thisComp = this;
		if(this.noSearch){
			thisComp.$.list.classList.toggle('visible');
			thisComp.highlightedElement();
		}
	},
	searchElement: function(e){
		var search = this.input.value.toLowerCase();
		var elems = this.$.list.querySelectorAll('li');
		for(var i = 0; i < elems.length; i++){
			var str = elems[i].innerHTML;
			(str.toLowerCase().search(search) == -1) ? elems[i].classList.add('hide') : elems[i].classList.remove('hide');
		}
		var results = this.$.list.querySelectorAll('li.hide');
		( results.length === elems.length ) ? this.$.noRes.classList.remove('hide') : this.$.noRes.classList.add('hide');
		this.highlightedElement();
	}
});