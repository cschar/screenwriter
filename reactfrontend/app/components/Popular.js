var React = require('react');
var PropTypes = require('prop-types');
var api = require('../utils/api.js');
var Loading = require('./Loading.js');

//Stateless Functional Component
function SelectedLanguage(props) {

  var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
      <ul className="languages">
        {languages.map(function (lang) {
          return (
              <li
                  key={lang}
                  style={lang === props.selectedLanguage ? {'color': '#d0821b'} : null}
                  onClick={props.onSelect.bind(null, lang)}>
                {lang}
              </li>
          )
        })}
      </ul>
  )
}
SelectedLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};


function RepoGrid (props) {
  return (
      <ul className="popular-list">
        {props.repos.map(function(repo, index) {
          return (
            <li key={repo.name} className='popular-item'>
              <div className='popular-rank'>#{index + 1}</div>
              <ul className='space-list-items'>
                <li>
                 <img
                    className='avatar'
                    src={repo.owner.avatar_url}
                    alt={'Avatar for ' + repo.owner.login}
                  />
                 </li>
                <li><a href={repo.html_url}> {repo.name} </a></li>
                <li>@{repo.owner.login}</li>
                <li>{repo.stargazers_count} stars</li>
              </ul>

             </li>
          )
        })}
      </ul>
  )
}
RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    };

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    });

    api.fetchPopularRepos(lang)
        .then(function(repos) {
          this.setState(function () {
            return {
              repos: repos
            }
          })
        }.bind(this));
  }

  render() {

    return (
        <div>
            <SelectedLanguage
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage} />

          {!this.state.repos
              ? <Loading text='Loading===' />
              : <RepoGrid repos={this.state.repos} />}
        </div>
    )
  }
}


module.exports = Popular;