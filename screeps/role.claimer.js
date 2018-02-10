var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES); // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
        //if(creep.room.controller && !creep.room.controller.my) {
        let room = creep.room.name;
        if(room!=='W44N1'){
            var posInAnotherRoom = new RoomPosition(41, 38, 'W44N1');
            creep.moveTo(posInAnotherRoom);
        } else {
            if(creep.claimController(Game.getObjectById('5982fc14b097071b4adbcc3e')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('5982fc14b097071b4adbcc3e'));
            } else {
                const tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                creep.moveTo(tower);
            }
        }
    }
};

module.exports = roleClaimer;