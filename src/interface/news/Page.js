import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import articles from 'articles';
import DocumentTitle from 'interface/DocumentTitle';

import ArticleLoader from './ArticleLoader';
import './News.scss';

class Page extends React.PureComponent {
  static propTypes = {
    articleId: PropTypes.string.isRequired,
  };

  renderBreadcrumbs(breadcrumbs) {
    return breadcrumbs.map((item, index) => (
      <React.Fragment key={index}>
        {item}
        {index !== (breadcrumbs.length - 1) && (
          <>
            {' '}&gt;{' '}
          </>
        )}
      </React.Fragment>
    ));
  }

  render() {
    const fileName = articles[this.props.articleId];

    const breadcrumbs = [
      <Link to="/">
        Home
      </Link>,
      <Link to="/#Announcements">
        Announcements
      </Link>,
    ];

    return (
      <div className="container news">
        <ArticleLoader
          key={fileName}
          fileName={fileName}
        >
          {({ article, showLoader }) => showLoader ? (
            <>
              {this.renderBreadcrumbs(breadcrumbs)}<br /><br />

              <div className="spinner" style={{ fontSize: 5 }} />

              <DocumentTitle title="News" />
            </>
          ) : (
            <>
              {this.renderBreadcrumbs([
                ...breadcrumbs,
                article.props.title,
              ])}<br /><br />

              {article}

              <DocumentTitle title={article.props.title} />
            </>
          )}
        </ArticleLoader>
      </div>
    );
  }
}

export default Page;
