var tower = {

    defense: function (room, spawn) {
        if (room) {

            var towers = Game.rooms[room].find(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_TOWER } });
            var fullTowers = true;
            for (var id in towers) {
                if (towers[id].energy < towers[id].energyCapacity * 0.9) {
                    fullTowers = false;
                    break;
                }
            }

            var walls = Game.rooms[room].find(FIND_STRUCTURES, {
                filter: (structure) => (structure.structureType == STRUCTURE_WALL ||
                    structure.structureType == STRUCTURE_RAMPART)
            });
            var weakestWall = 300000000;
            for (var id in walls) {
                if (walls[id].hits < weakestWall) {
                    weakestWall = walls[id].hits;
                }
            }
            if (fullTowers) {
                var enoughStorage = Game.rooms[room].find(FIND_MY_STRUCTURES, {
                    filter: (structure) => structure.structureType == STRUCTURE_STORAGE && structure.store[RESOURCE_ENERGY] > 500000
                });

                if (enoughStorage.length > 0) {
                    for (var id in towers) {
                        var closestDamagedStructure = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => structure.hits < (weakestWall + 1000) && (structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART)
                        });

                        if (closestDamagedStructure) {
                            towers[id].repair(closestDamagedStructure);
                        }
                    }
                }
            }

            for (var id in towers) {
                var defenders = _.filter(Game.creeps, (creep) => creep.memory.role == spawn + 'Harvester' && creep.hits < creep.hitsMax);
                if (defenders[0]) {
                    towers[id].heal(defenders[0]);
                }
                var allHostiles = Game.rooms[room].find(FIND_HOSTILE_CREEPS);
                if (allHostiles.length > 2) {
                    if (room === 'W43N3') {
                        var newName = 'MarkopolisDefender' + Game.time;
                        Game.spawns['Marktwopolis'].spawnCreep(EMERGENCY_DEFENDERS_BODY['Markopolis'], newName, { memory: { role: 'MarkopolisDefender' } });
                    }
                    Game.notify('HELP! ' + allHostiles.length + ' hostiles in ' + spawn + '!!!');
                }

                var closestHostile = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                const healer = towers[id].pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                    filter: function (object) {
                        return object.getActiveBodyparts(HEAL) > 0;
                    }
                });

                if (healer) {
                    towers[id].attack(healer);
                    if (healer.hits < 100) {
                        Game.notify('Hostile in ' + spawn + '(healer) killed: ', healer);
                    }
                } else if (closestHostile) {
                    towers[id].attack(closestHostile);
                    if (closestHostile.hits < 100) {
                        Game.notify('Hostile in ' + spawn + '(invader) killed: ', closestHostile);
                    }
                }
                /**
                var roads = towers[id].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: function (object) {
                        return ((object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax - RAMPART_STRENGTH[room])))
                    }
                });
                if (roads) {
                    towers[id].repair(roads);
                }
                **/
            }
        }
    }
};

module.exports = tower;