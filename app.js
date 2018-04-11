var client = algoliasearch('Q71HM8430Y', '7f42b7cbd41474bf777414c24302d4a4');
var players = client.initIndex('players');
var teams = client.initIndex('teams');

autocomplete(
  '#aa-search-input',
  {
    debug: true,
    templates: {
      dropdownMenu:
        '<div class="aa-dataset-player"></div>' +
        '<div class="aa-dataset-team"></div>'
    }
  },
  [
    {
      source: autocomplete.sources.hits(players, { hitsPerPage: 7 }),
      displayKey: 'name',
      name: 'player',
      templates: {
        header: '<div class="aa-suggestions-category">Players</div>',
        suggestion: function(suggestion) {
          return (
            '<span>' +
            suggestion._highlightResult.name.value +
            '</span><span>' +
            suggestion._highlightResult.team.value +
            '</span>'
          );
        },
        empty: '<div class="aa-empty">No matching players</div>'
      }
    },
    {
      source: autocomplete.sources.hits(teams, { hitsPerPage: 5 }),
      displayKey: 'name',
      name: 'team',
      templates: {
        header: '<div class="aa-suggestions-category">Teams</div>',
        suggestion: function(suggestion) {
          return (
            '<div><span>' +
            suggestion._highlightResult.name.value +
            '</span><span>' +
            suggestion._highlightResult.location.value +
            '</span></div>'
          );
        },
        empty: '<div class="aa-empty">No matching teams</div>'
      }
    }
  ]
);
