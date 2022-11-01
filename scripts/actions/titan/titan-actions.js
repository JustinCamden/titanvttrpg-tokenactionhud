import { ActionHandler } from '../actionHandler.js';
import * as settings from '../../settings.js';
import { Logger } from '../../logger.js';

export class TitanActionHandler extends ActionHandler {
   constructor(filterManager, categoryManager) {
      super(filterManager, categoryManager);
   }

   localize(label) {
      return game.i18n.localize(`tokenActionHud.titan.${label}.label`);
   }

   /** @override */
   doBuildActionList(token, multipleTokens) {
      if (token) {
         return this._buildSingleTokenList(token);
      } else if (multipleTokens) {
         return this._buildMultipleTokenList();
      }
      return this.initializeEmptyActionList();
   }

   _buildSingleTokenList(token) {
      // Initialize list
      const list = this.initializeEmptyActionList();
      list.tokenId = token?.id;
      list.actorId = token?.actor?.id;
      if (!list.tokenId || !list.actorId) {
         return list;
      }

      // Show hud title
      if (settings.get('showHudTitle')) {
         list.hudTitle = token.name;
      }

      // If this token is a character
      const actor = token.actor;
      if (actor.type === 'player' || actor.type === 'npc') {
         // Create a tokens list string
         let tokenIds = `|${token.id}`;

         const categories = [
            ...this._buildBaseCategories(tokenIds),
            this._buildWeaponsCategory(actor, tokenIds),
            this._buildEquipmentCategory(actor, tokenIds),
            this._buildAbilitiesCategory(actor, tokenIds),
            this._buildSpellsCategory(actor, tokenIds)
         ];

         categories
            .flat()
            .filter((category) => category)
            .forEach((category) => {
               this._combineCategoryWithList(list, category.name, category);
            });

         return list;
      }
   }

   _buildMultipleTokenList() {
      const list = this.initializeEmptyActionList();
      list.tokenId = 'multi';
      list.actorId = 'multi';

      // Get all controlled characters
      const tokens = canvas.tokens.controlled
         .filter((token) => {
            const type = token.actor.type;
            return type === 'player' || type === 'npc';
         });

      // If there are any controlled characters
      if (tokens.length > 0) {

         // Populate the actor ids
         let tokenIds = '';
         tokens.forEach((actor) => {
            tokenIds += `|${actor.id}`;
         });

         const categories = this._buildBaseCategories(tokenIds);
         categories
            .flat()
            .filter((category) => category)
            .forEach((category) => {
               this._combineCategoryWithList(list, category.name, category);
            });

         return list;
      }
   }

   _buildBaseCategories(tokenIds) {
      return [
         this._buildAttributesCategory(tokenIds),
         this._buildSkillsCategory(tokenIds),
         this._buildResistancesCategory(tokenIds)
      ];
   }

   // Attributes Category
   _buildAttributesCategory(tokenIds) {
      const retVal = {
         id: 'attributes',
         name: this.localize('attributes'),
         subcategories: []
      }

      retVal.subcategories.push(this._buildAttributesSubcategory(tokenIds));

      return retVal;
   }

   // Attributes Subcategory
   _buildAttributesSubcategory(tokenIds) {
      const attributes = {
         id: 'attributes',
         name: this.localize('attributes'),
         actions: [],
      }

      const attributesList = [
         'body',
         'mind',
         'soul'
      ]

      attributesList.forEach((attribute) => {
         attributes.actions.push({
            name: this.localize(attribute),
            encodedValue: `attributeCheck|${attribute}${tokenIds}`
         });
      });

      return attributes;
   }

   // Resistance Category
   _buildResistancesCategory(tokenIds) {
      const retVal = {
         id: 'resistances',
         name: this.localize('resistances'),
         subcategories: []
      }

      retVal.subcategories.push(this._buildResistancesSubcategory(tokenIds));

      return retVal;
   }

   // Resistances Subcategory
   _buildResistancesSubcategory(tokenIds) {
      const resistances = {
         id: 'resistances',
         name: this.localize('resistances'),
         actions: [],
      }

      const resistancesList = [
         'reflexes',
         'resilience',
         'willpower'
      ]

      resistancesList.forEach((resistance) => {
         resistances.actions.push({
            name: this.localize(resistance),
            encodedValue: `resistanceCheck|${resistance}${tokenIds}`
         });
      });

      return resistances;
   }

   // Skills Category
   _buildSkillsCategory(tokenIds) {
      const retVal = {
         id: 'skills',
         name: this.localize('skills'),
         subcategories: []
      }

      retVal.subcategories.push(this._buildSkillsSubcategory(tokenIds));

      return retVal;
   }

   // Skills Subcategory
   _buildSkillsSubcategory(tokenIds) {
      const skills = {
         id: 'skills',
         name: this.localize('skills'),
         actions: [],
      }

      const skillsList = [
         'arcana',
         'athletics',
         'deception',
         'dexterity',
         'diplomacy',
         'engineering',
         'intimidation',
         'investigation',
         'lore',
         'medicine',
         'meleeWeapons',
         'metaphysics',
         'nature',
         'perception',
         'performance',
         'rangedWeapons',
         'subterfuge',
         'stealth'
      ];

      skillsList.forEach((skill) => {
         skills.actions.push({
            name: this.localize(skill),
            encodedValue: `skillCheck|${skill}${tokenIds}`
         });
      });

      return skills;
   }

   _buildWeaponsCategory(actor, tokenIds) {
      const retVal = {
         id: 'weapons',
         name: this.localize('weapons'),
         subcategories: []
      }

      const weapons = actor.items.filter((item) => item.type === 'weapon' && item.system.attack.length > 0).sort((a, b) => {
         if (a.sort < b.sort) {
            return -1;
         }
         if (a.sort > b.sort) {
            return 1;
         }
         return 0;
      });
      weapons.forEach((weapon) => retVal.subcategories.push(this._buildWeaponSubcategory(weapon, tokenIds)));

      return retVal;
   }

   _buildWeaponSubcategory(weapon, tokenIds) {
      const retVal = {
         id: weapon._id,
         name: weapon.name,
         actions: [],
      };

      weapon.system.attack.forEach((attack, idx) => {
         retVal.actions.push({
            name: attack.label,
            encodedValue: `attackCheck|${weapon._id}|${idx}${tokenIds}`
         });
      });

      retVal.actions.push({
         name: this.localize(weapon.system.multiAttack ? 'multiAttackOn' : 'multiAttackOff'),
         encodedValue: `toggleMultiAttack|${weapon._id}${tokenIds}`
      });

      weapon.system.check.forEach((check, idx) => {
         retVal.actions.push({
            name: `${check.label} ${check.difficulty}:${check.complexity}`,
            encodedValue: `itemCheck|${weapon._id}|${idx}${tokenIds}`
         });
      });

      return retVal;
   }

   _buildSpellsCategory(actor, tokenIds) {
      const retVal = {
         id: 'spells',
         name: this.localize('spells'),
         subcategories: []
      }

      const spells = actor.items.filter((item) => item.type === 'spell').sort((a, b) => {
         if (a.sort < b.sort) {
            return -1;
         }
         if (a.sort > b.sort) {
            return 1;
         }
         return 0;
      });

      let traditions = [];
      spells.forEach((spell) => {
         if (traditions.indexOf(spell.system.tradition) === -1) {
            traditions.push(spell.system.tradition);
         }
      });

      traditions.forEach((tradition) => {
         const traditionSubcategory = {
            id: tradition,
            name: tradition,
            actions: []
         };

         spells.forEach((spell) => {
            if (spell.system.tradition === tradition) {
               traditionSubcategory.actions.push({
                  name: `${spell.name} ${spell.system.castingCheck.difficulty}:${spell.system.castingCheck.complexity}`,
                  encodedValue: `castingCheck|${spell._id}${tokenIds}`
               });
            }
         });

         retVal.subcategories.push(traditionSubcategory);
      });

      return retVal;
   }

   _buildEquipmentCategory(actor, tokenIds) {
      const retVal = {
         id: 'equipment',
         name: this.localize('equipment'),
         subcategories: []
      }

      const items = actor.items.filter((item) => {
         if (item.system.check.length > 0) {
            switch (item.type) {
               case 'weapon': {
                  return false;
               }

               case 'ability': {
                  return false;
               }

               case 'armor': {
                  return actor.system.equipped.armor === item._id;
               }

               case 'shield': {
                  return actor.system.equipped.shield === item._id;
               }

               default: {
                  return item.system.equipped === undefined ? true : item.system.equipped;
               }
            }
         }
      }).sort((a, b) => {
         if (a.sort < b.sort) {
            return -1;
         }
         if (a.sort > b.sort) {
            return 1;
         }
         return 0;
      });

      items.forEach((item) => retVal.subcategories.push(this._buildItemCheckSubcategory(item, tokenIds)));

      return retVal;
   }

   _buildItemCheckSubcategory(item, tokenIds) {
      const retVal = {
         id: item._id,
         name: item.name,
         actions: [],
      };

      item.system.check.forEach((check, idx) => {
         retVal.actions.push({
            name: `${check.label} ${check.difficulty}:${check.complexity}`,
            encodedValue: `itemCheck|${item._id}|${idx}${tokenIds}`
         });
      });

      return retVal;
   }

   _buildAbilitiesCategory(actor, tokenIds) {
      const retVal = {
         id: 'abilities',
         name: this.localize('abilities'),
         subcategories: []
      }

      const abilities = actor.items.filter((item) => item.type === 'ability').sort((a, b) => {
         if (a.sort < b.sort) {
            return -1;
         }
         if (a.sort > b.sort) {
            return 1;
         }
         return 0;
      });

      abilities.forEach((item) => retVal.subcategories.push(this._buildItemCheckSubcategory(item, tokenIds)));

      return retVal;
   }
}