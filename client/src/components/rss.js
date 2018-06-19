import React, { Component} from 'react';

class FetchDataFromRSSFeed extends Component {
  constructor() {
    super();
    this.state = {
      recentBlogPost: {
        name: '',
        url: ''
      }
    }
  }

  FetchDataFromRssFeed() {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState == 4 && request.status == 200) {
        var myObj = JSON.parse(request.responseText);
        console.log("poo");
        for (var i = 0; i < 2; i ++) {
          this.setState({
            recentBlogPost: {
              allEpisodes: myObj.items,
              name: myObj.items[i].title,
              url: myObj.items[i].link,
              link: myObj.items[i].enclosure.link
            }
          });
        }
      }
    }
    request.open("GET", "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.acast.com%2Feggchasers&api_key=oqb51kmku10yql1gt3wopkdzvhb84z9rp1jbudqb&count=500", true);
    request.send();
  }

  componentDidMount() {
    {this.FetchDataFromRssFeed()}
  }

  render() {
    console.log(this.state.allEpisodes);

    return (
      <div>
        Check out our blog: <a target="_blank" href={this.state.recentBlogPost.url}>{this.state.recentBlogPost.name}</a>
        Play: <a target="_blank" href={this.state.recentBlogPost.link}>{this.state.recentBlogPost.name}</a>

      </div>
    );
  }
}

export default FetchDataFromRSSFeed;
