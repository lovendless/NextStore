import { stackMiddlewares } from "./middlewares/stackMiddlewares";
import { withAuthMiddleware } from "./middlewares/withAuthMiddleware";
import { withCorsMiddleware } from "./middlewares/withCorsMiddleware";

const middlewares = [withCorsMiddleware, withAuthMiddleware]
export default stackMiddlewares(middlewares)