import { RollHandler } from "../rollHandler.js";

// Could potentially handle rolls from exampleActionHandler ('../actions/exampleActionHandler.js')
export class TitanRollHandler extends RollHandler {
   constructor() {
      super();
   }

   /** @override */
   doHandleActionEvent(event, encodedValue) {
      let payload = encodedValue.split("|");
      let actionType = payload[0];
      if (!actionType) {
         console.error('TOKEN ACTION HUD (TITAN) | Action Failed. No provided Action type.');
         console.trace();
         return;
      }

      switch (actionType) {

         // Attribute check
         case 'attributeCheck': {
            const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
            const attribute = payload[1];
            if (!attribute) {
               console.error('TOKEN ACTION HUD (TITAN) | Attribute Check Failed. No provided Attribute.');
               console.trace();
               return;
            }

            // For each actor in the payload
            for (let payloadIdx = 2; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.rollAttributeCheck({
                        attribute: attribute,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Attribute Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }

               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Attribute Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         // Skill check
         case 'resistanceCheck': {
            const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
            const resistance = payload[1];
            if (!resistance) {
               console.error('TOKEN ACTION HUD (TITAN) | Resistance Check Failed. No provided Resistance.');
               console.trace();
               return;
            }

            // For each actor in the payload
            for (let payloadIdx = 2; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.rollResistanceCheck({
                        resistance: resistance,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Resistance Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Resistance Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         // Skill check
         case 'skillCheck': {
            const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
            const skill = payload[1];
            if (!skill) {
               console.error('TOKEN ACTION HUD (TITAN) | Skill Check Failed. No provided Skill.');
               console.trace();
               return;
            }

            // For each actor in the payload
            for (let payloadIdx = 2; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.rollAttributeCheck({
                        skill: skill,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Skill Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Skill Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         // Attack check
         case 'attackCheck': {
            const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
            const itemId = payload[1];
            if (!itemId) {
               console.error('TOKEN ACTION HUD (TITAN) | Attack Check Failed. No provided Weapon ID.');
               console.trace();
               return;
            }

            const attackIdx = payload[2];
            if (!attackIdx) {
               console.error('TOKEN ACTION HUD (TITAN) | Attack Check Failed. No provided Attack IDX.');
               console.trace();
               return;
            }

            // For each actor in the payload
            for (let payloadIdx = 3; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.rollAttackCheck({
                        itemId: itemId,
                        attackIdx: attackIdx,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Attack Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Attack Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         // Toggle multi attack 
         case 'toggleMultiAttack': {
            const itemId = payload[1];
            if (!itemId) {
               console.error('TOKEN ACTION HUD (TITAN) | Toggle Multi-Attack Failed. No provided Weapon ID.');
               console.trace();
               return;
            }

            // For each actor in the payload
            for (let payloadIdx = 2; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.toggleMultiAttack(itemId);
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Toggle Multi-Attack Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Toggle Multi-Attack Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         default: {
            console.error(`TOKEN ACTION HUD (TITAN) | Action. Invalid action type (${actionType}).`);
            console.trace();
            return;
         }
      }
   }
}
