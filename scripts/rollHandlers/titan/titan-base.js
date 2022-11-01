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
                     const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
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
                     const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
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
                  const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
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
                  const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
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

         // Item check
         case 'itemCheck': {
            const itemId = payload[1];
            if (!itemId) {
               console.error('TOKEN ACTION HUD (TITAN) | Item Check Failed. No provided Item ID.');
               console.trace();
               return;
            }

            const checkIdx = payload[2];
            if (!checkIdx) {
               console.error('TOKEN ACTION HUD (TITAN) | Item Check Failed. No provided Check IDX.');
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
                     const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
                     character.rollItemCheck({
                        itemId: itemId,
                        checkIdx: checkIdx,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Item Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Item Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         // Item check
         case 'castingCheck': {
            const itemId = payload[1];
            if (!itemId) {
               console.error('TOKEN ACTION HUD (TITAN) | Casting Check Failed. No provided Item ID.');
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
                     const getOptions = game.settings.get('titan', 'getCheckOptions') === true || event.shiftKey;
                     character.rollCastingCheck({
                        itemId: itemId,
                        getOptions: getOptions
                     });
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Item Check Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Item Check Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         case 'rest': {
            // For each actor in the payload
            for (let payloadIdx = 1; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.rest(true);
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Rest Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Rest Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         case 'takeABreather': {
            // For each actor in the payload
            for (let payloadIdx = 1; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.takeABreather(true);
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Take a Breather Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Take a Breather Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         case 'removeTemporaryEffects': {
            // For each actor in the payload
            for (let payloadIdx = 1; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.removeTemporaryEffects(true);
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Remove Temporary Effects Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Remove Temporary Effects Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         case 'spendResolve': {
            // For each actor in the payload
            for (let payloadIdx = 1; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.spendResolve(true);
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Spend Resolve Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Spend Resolve Failed. No Actor found (Actor ID: ${actorId}).`);
                  console.trace();
               }
            }

            return;
         }

         case 'toggleInspiration': {
            // For each actor in the payload
            for (let payloadIdx = 1; payloadIdx < payload.length; payloadIdx++) {
               const actorId = payload[payloadIdx];
               const actor = super.getActor(actorId);

               if (actor) {
                  const character = actor.character;
                  if (character) {
                     character.toggleInspiration();
                  }

                  else {
                     console.error(`TOKEN ACTION HUD (TITAN) | Toggle Inspiration Failed. No Character component found (Actor ID: ${actorId}).`);
                     console.trace();
                  }
               }

               else {
                  console.error(`TOKEN ACTION HUD (TITAN) | Toggle Inspiration Failed. No Actor found (Actor ID: ${actorId}).`);
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
