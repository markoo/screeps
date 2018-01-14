var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('build');
	    }
        
	    if(creep.memory.building) {
	        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(target) {
                if(creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                var roads = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function(object){ 
                    return (object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax)) ||
                           (object.structureType == STRUCTURE_RAMPART && (object.hits < object.hitsMax-RAMPART_STRENGTH[creep.room.name]))
                }});
                if(roads) {
                    if(creep.repair(roads) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(roads, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }

        //if(!sources[1].energy){
            var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_STORAGE );
                }
            });
            
            if ( creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo( theStorage );
            }

        //}

	    }
	}
};

module.exports = roleBuilder;