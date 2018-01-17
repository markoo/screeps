var roleDefender = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const healer = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function(object) {
                return object.getActiveBodyparts(HEAL) > 0;
            }
        });
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS); // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
// FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
        if(healer||target) {
            //if(creep.room.controller && !creep.room.controller.my) {
            if(healer){
                if(creep.rangedAttack(healer) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(healer);
                }
            }else{
                if(creep.rangedAttack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            /**
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            **/
        //}
        }
        else{
            const tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            creep.moveTo(tower);
        }
    }
};

module.exports = roleDefender;