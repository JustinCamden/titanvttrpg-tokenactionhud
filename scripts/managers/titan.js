import { SystemManager } from "./manager.js";
import { TitanActionHandler as ActionHandler } from "../actions/titan/titan-actions.js";
import { TitanRollHandler as Core } from "../rollHandlers/titan/titan-base.js";

export class TitanSystemManager extends SystemManager {
   constructor(appName) {
      super(appName);
   }

   /** @override */
   doGetActionHandler(filterManager, categoryManager) {
      let actionHandler = new ActionHandler(filterManager, categoryManager);

      return actionHandler;
   }

   /** @override */
   getAvailableRollHandlers() {
      let coreTitle = "Titan VTTRPG";

      let choices = { core: coreTitle };

      return choices;
   }

   /** @override */
   doGetRollHandler(handlerId) {
      let rollHandler;
      switch (handlerId) {
         case "core":
         default:
            rollHandler = new Core();
            break;
      }

      return rollHandler;
   }
}
