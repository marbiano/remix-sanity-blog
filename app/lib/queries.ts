const postFields = `
  _id,
  title,
  "slug": slug.current,
  "author": author->{ name, image },
  coverImage,
  publishedAt,
`;

export const indexQuery = `
*[_type == "post"] | order(publishedAt desc, _updatedAt desc) {
  ${postFields}
}`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
  intro,
  body[]{
    ..., 
    asset->{
      ...,
      "_key": _id
    }
  }
}
`;
