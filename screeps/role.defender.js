var roleDefender = {

    /** @param {Creep} creep **/
    run: function (creep) {
        const healer = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
            filter: function (object) {
                return object.getActiveBodyparts(HEAL) > 0;
            }
        });
        let room = creep.room.name;
        creep.say('Defend');
        const pos01AnotherRoom = new RoomPosition(30, 1, 'W44N2');
        const posInAnotherRoom = new RoomPosition(30, 7, 'W44N2');
        if (room == 'W43N3' || room == 'W44N3') {
            creep.moveTo(posInAnotherRoom);
        }
        if (room == 'W43N2' || room == 'W44N2') {
            creep.moveTo(posInAnotherRoom);
        }

        const wall = Game.getObjectById('5b4b55b402e1844733f1ad85');
        const rampart = Game.getObjectById('5b4fcb6746c626287422f389');
        const rampart2 = Game.getObjectById('5b5b764a50b551211c5e8f3c');
        const rampart3 = Game.getObjectById('5b5b7596025e8513fefd4f4d');
        const rampart4 = Game.getObjectById('5b4fcb1aa7bc280f8c5a1046');
        
        let target = null;
        if (rampart != null) {
            target = rampart;
        } else if (rampart2 != null) {
            target = rampart2;
        } else if (rampart3 != null) {
            target = rampart3;
        } else {
            target = rampart4;
        }
        // const target = creep.pos.findClosestByRange(FIND_STRUCTURES, 1,{ filter: (structure) => (structure.structureType == STRUCTURE_RAMPART) }); // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS
        // FIND_HOSTILE_STRUCTURES, FIND_HOSTILE_CREEPS


        if (healer || (target)) {
            //if(creep.room.controller && !creep.room.controller.my) {
            if (healer) {
                if (creep.attack(healer) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(healer);
                }
            } else {
                if (creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
            if (creep.hits < creep.hitsMax) {
                creep.heal(creep);
            }
            /**
            if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
            **/
            //}
        }
        else {
            //const tower = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            //creep.moveTo(tower);
        }
    }
};

module.exports = roleDefender;