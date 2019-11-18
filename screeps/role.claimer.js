var roleClaimer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES); // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
        //if(creep.room.controller && !creep.room.controller.my) {
        let room = creep.room.name;
        //creep.heal(creep);
        if (room === 'W43N2') {
            var posInAnotherRoom = new RoomPosition(5, 36, 'W44N2');
            creep.moveTo(posInAnotherRoom);
        } else {
            if (creep.claimController(Game.getObjectById('5982fc13b097071b4adbcc3a')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('5982fc13b097071b4adbcc3a'));
            } else {
                if (creep.room.controller) {
                    if (creep.signController(creep.room.controller, "I am number 10!") == ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.controller);
                    }
                }
                // const tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                // creep.moveTo(tower);
            }
        }
    }
};

module.exports = roleClaimer;