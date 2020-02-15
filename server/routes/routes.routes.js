const routes = [
  require( './auth.routes' ),
  require( './user.routes' ),
  require( './member.routes' ),
  require( './organization.routes' ),
  require( './area.routes' ),
  require( './ticket.routes' ),
  require( './images.routes' ),
  require( './comments.routes' )
];

module.exports = routes;