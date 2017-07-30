<h1>Welcome to QCNPJ Crawler documentation!</h1>
QCNPJ Crawler aims to be one of the services to enrich information about leads.

<h3>Contents</h3>
<ul>
  <li>Introduction</li>
    <ul>
      <li>Features</li>
    </ul>
  <li>Instalation
    <ul>
      <li>Dependencies</li>
      <li>Get a copy</li>
    </ul>
  </li>
  <li>Configuration
  <li>Use Cases
    <ul>
      <li>Company information [/]</li>
    </ul>
  </li>
  <li>Copyrights and Licence</li>
</ul>
<h3>Introduction</h3>
QCNPJ Crawler has as goal, to return information about company through company name.
<h4>Features</h4>
This application provides company information.
<h3>Instalation</h3>
qcnpj-crawler is a very smaller component that provide a simple way to retrieval company information for intellead ecosystem.
This way you do not need to install any other components for this to work.
<h4>Dependencies</h4>
This application depends on the site https://www.google.com and https://qcnpj.com.br
<h4>Get a copy</h4>
I like to encourage you to contribute to the repository.<br>
This should be as easy as possible for you but there are few things to consider when contributing. The following guidelines for contribution should be followed if you want to submit a pull request.
<ul>
  <li>You need a GitHub account</li>
  <li>Submit an issue ticket for your issue if there is no one yet.</li>
  <li>If you are able and want to fix this, fork the repository on GitHub</li>
  <li>Make commits of logical units and describe them properly.</li>
  <li>If possible, submit tests to your patch / new feature so it can be tested easily.</li>
  <li>Assure nothing is broken by running all the tests.</li>
  <li>Open a pull request to the original repository and choose the right original branch you want to patch.</li>
  <li>Even if you have write access to the repository, do not directly push or merge pull-requests. Let another team member review your pull request and approve.</li>
</ul>
<h3>Configuration</h3>
Once the application is installed (check Installation) is not need define others settings. 
<h3>Use Cases</h3>
A use case for qcnpj-crawler.
<h4>Company information [/]</h4>
This application provides a service to retrieval company information.
We can call the API like this:


```javascript

var company_name = "Company Name";
var queryQcnpjCrawler = 'https://your_domain.com/?companyName='+company_name;
request(queryQcnpjCrawler, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
        //do something
    }
});


```


This service return a json like this:


```javascript

{
    "company":"Company Name",
    "cnpj":"33.997.391/0001-10",
    "main_activity_name":"Construção de edifícios",
    "main_activity_code":"41.20-4-00",
    "company_situation":"ATIVA",
    "company_social_capital":"500000.00",
    "company_telephone":"(48) 99999-9999"
}

```


<h3>Copyrights and Licence</h3>
TO DO
