var roleInvader = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const target = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        let room = creep.room.name;
        console.log('creep: ', room);
        if (room !== 'W44N1') {
            console.log('invader: 1');
            var posInAnotherRoom = new RoomPosition(47, 31, 'W44N1');
            creep.moveTo(posInAnotherRoom);
        } else {
            console.log('invader: 2', creep.attack(Game.getObjectById('5b4b1fa53a191846ffad1b3a')));
            creep.rangedAttack(Game.getObjectById('5b4b1fa53a191846ffad1b3a'));

        }
    }
};

module.exports = roleInvader;