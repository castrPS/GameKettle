/**
   * Performs a search request against an Elasticsearch server.
   * @param {string} needle
   *   The string to search for.
   * @param {string} filter
   *   A string to use to filter by type. For example: 'article';
   */
  function doSearch (needle) {
    var searchHost = 'http://localhost:9200/reviews/_search';
	var body = {
      'size': 20
    };
	var query = {
        'bool': {}
    };
    query.bool.must = {
    	'match': {
            "comments": needledrag
        }
    };
	
	body.query = query;

    // Perform the request.
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open('POST', searchHost, false);
    xmlHttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xmlHttp.send(JSON.stringify(body));
    var response = JSON.parse(xmlHttp.responseText);

    // Print results on screen.
    var output = response.hits.hits;
    document.getElementById('total').innerHTML = '<h2>Showing ' + response.hits.hits.length + ' results</h2>';
    document.getElementById('hits').innerHTML = output;
  }

  /**
   * Helper function to obtain the value of a set of radio buttons.
   *
   * @param {string} name
   *   The name of the radio elements.
   * @returns {string}
   *   The selected value or an empty string if nothing was selected.
   */
  function getRadioButtonValue (name) {
    var radios = document.getElementsByName(name);

    for (var i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        return radios[i].value;
      }
    }
    return '';
  }

  doSearch('', '');