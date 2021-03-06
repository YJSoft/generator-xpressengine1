'use strict';
var util = require('util');
var yeoman = require('yeoman-generator');
var Configstore = require('configstore');

var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
};
util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.askFor = function askFor() {
  var done = this.async();
  var conf = new Configstore('generator-rhymix',{
      author_email: 'someone@example.com',
      author_link: 'http://example.com',
      author_name: 'Someone'
    });
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  if (month<10)
  {
	  month = '0' + month;
  }
  var date = d.getDate();
  if (date<10)
  {
	  date = '0' + date;
  }

  var prompts = [{
      name: 'module_name',
      message: 'Widget ID',
      default: this.appname
    },
	{
      name: 'module_fullname',
      message: 'Widget Name',
      default: this.appname
    },
	{
      name: 'module_description',
      message: 'Widget description',
      default: 'Widget ' + this.appname
    },
	{
      name: 'module_version',
      message: 'Widget version',
      default: '0.0.1'
    },
	{
      name: 'module_date',
      message: 'Widget Create Date',
      default: year + '-' + month + '-' + date
    },
	{
      name: 'author_email',
      message: 'Widget author email',
      default: conf.get('author_email')
    },
	{
      name: 'author_link',
      message: 'Widget author link',
      default: conf.get('author_link')
    },
	{
      name: 'author_name',
      message: 'Widget author name',
      default: conf.get('author_name')
    }
  ];

  this.prompt(prompts, function (props) {
	//config save
	conf.set('author_email',props.author_email);
	conf.set('author_link',props.author_link);
	conf.set('author_name',props.author_name);
    
    //filter some var
    props.module_name = props.module_name.replace(/[^A-Za-z0-9_]/g, "");

	//value set
    this.module_name = props.module_name;
	this.module_fullname = props.module_fullname;
	this.module_description = props.module_description;
	this.module_version = props.module_version;
	this.module_date = props.module_date;
	this.author_email = props.author_email;
	this.author_link = props.author_link;
	this.author_name = props.author_name;
    done();
  }.bind(this));
};

Generator.prototype.files = function files() {
  //directory
  this.mkdir('conf');

  //addon file
  this.template('class.php', this.module_name + '.class.php');

  //conf
  this.template('conf/info.xml', 'conf/info.xml');
};