var roleRemoteBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if(targets) {
                if(creep.build(targets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }else{
                // (structure.structureType == STRUCTURE_RAMPART && structure.hits < (structure.hitsMax - rampEnergy)) ||
                
                const wallEnergy = 299990000;
                const rampEnergy = 299000;
                var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) =>  (structure.structureType == STRUCTURE_ROAD && structure.hits < structure.hitsMax) || 
                                        (structure.structureType == STRUCTURE_CONTAINER && structure.hits < structure.hitsMax)
                });
                if(closestDamagedStructure) {
                    if(creep.repair(closestDamagedStructure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
    	    }
            /**
            var ramparts = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_RAMPART && structure.hits < (structure.hitsMax-9999000));
            if(ramparts.length) {
                if(creep.repair(ramparts[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(ramparts[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            var roads = creep.room.find(FIND_STRUCTURES, { filter: function(object){ return object.structureType === STRUCTURE_ROAD && (object.hits < object.hitsMax)}});
            if(roads.length) {
                if(creep.repair(roads[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(roads[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            **/
	    }
	    else {
	    //     var sources = creep.room.find(FIND_SOURCES);
        //     if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
        //     }

        // //if(!sources[1].energy){
        //     var theStorage = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        //         filter: (structure) => {;
        //             return (structure.structureType == STRUCTURE_STORAGE );
        //         }
        //     });
            
        //     if ( creep.withdraw(theStorage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        //         creep.moveTo( theStorage );
        //     }

        // //}
            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE);
            if (source) {
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }

	    }
	}
};

module.exports = roleRemoteBuilder;