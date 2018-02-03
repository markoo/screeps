var roleClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES); // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
        //if(creep.room.controller && !creep.room.controller.my) {
        let room = creep.room.name;
        if(room!=='W43N1'){
            var posInAnotherRoom = new RoomPosition(4, 21, 'W43N1');
            creep.moveTo(posInAnotherRoom);
        } else {
            console.log('controller: ', creep.claimController(Game.getObjectById('5982fc1fb097071b4adbcdd8')));
            if(creep.claimController(Game.getObjectById('5982fc1fb097071b4adbcdd8')) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.getObjectById('5982fc1fb097071b4adbcdd8'));
            } else {
                const tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
                creep.moveTo(tower);
            }
        }
    }
};

module.exports = roleClaimer;