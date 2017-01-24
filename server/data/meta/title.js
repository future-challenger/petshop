import * as _ from 'lodash'
import config from '../../config'

export default function getTitle(data, root) {
  let title = ''
  const context = root ? root.context : null
  const blog = config.theme
  const pagination = root ? root.pagination : null
  let pageString = ''

  if (pagination && pagination.total > 1) {
    pageString = ` - Page ${pagination.page}`;
  }
  if (data.meta_title) {
    title = data.meta_title;
  } else if (_.includes(context, 'home')) {
    title = blog.title;
  } else if (_.includes(context, 'author') && data.author) {
    title = `${data.author.name}${pageString} - ${blog.title}`;
  } else if (_.includes(context, 'tag') && data.tag) {
    title = data.tag.meta_title || `${data.tag.name}${pageString} - ${blog.title}`;
  } else if ((_.includes(context, 'post') || _.includes(context, 'page')) && data.post) {
    title = data.post.meta_title || data.post.title;
  } else {
    title = blog.title + pageString;
  }

  return (title || '').trim();
}
