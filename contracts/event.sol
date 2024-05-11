// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EventContract {
    //structure_for_event
    struct Event {
        address organizer;
        string name;
        string location;
        uint256 ticketPrice;
        uint256 totalTickets;
        uint256 ticketsSold;
        string eventid;
        bool isActive;
    }

    struct eveId{
        string eventid;
        string name;
    }

    //structure_for_participant
    struct Participant {
        address participantAddress;
        string eventId;
        string participantId;
    }

    //store_events
    mapping(string => Event) public events;

    mapping (uint256 => eveId) public  eve;

    //store_participants
    mapping(string => Participant) public participants;

    uint256 public totalEvents;
    uint256 public totalParticipants;

    //event_created
    event EventCreated(uint256 eventId, address organizer);

    //new_event
    function createEvent(string memory _name, string memory _location, uint256 _ticketPrice, uint256 _totalTickets,string memory eveid) public {
        totalEvents++;
        eve[totalEvents] = eveId(eveid,_name);
         events[eveid] = Event(msg.sender, _name, _location, _ticketPrice, _totalTickets, 0,eveid, true);
    }

    //register_event
    function registerPay(string memory _eventId, uint256 _numTickets,uint256 p) public payable returns(bool) {
        require(events[_eventId].totalTickets <=0, "No Tickets Available");

        require(msg.value >= p, "Insufficient funds");
        events[_eventId].ticketsSold += _numTickets;
        payable(events[_eventId].organizer).transfer(msg.value);
        return true;
    }

    function participantRegister(string memory _eventId,string memory part) public returns(bool) {
        participants[part] = Participant(msg.sender, _eventId,part);
        totalParticipants++;
        return true;
    }

    //event_details
    function getEventDetails(string memory _eventId) public view returns (address organizer, string memory name, string memory location, uint256 ticketPrice, uint256 totalTickets, uint256 ticketsSold, bool isActive,string memory eventid) {
        Event storage eventDetails = events[_eventId];
        return (
            eventDetails.organizer,
            eventDetails.name,
            eventDetails.location,
            eventDetails.ticketPrice,
            eventDetails.totalTickets,
            eventDetails.ticketsSold,
            eventDetails.isActive,
            eventDetails.eventid
        );
    }

    //participant_details
    function getParticipantDetails(string memory part) public view returns (string memory participantAddress, string memory eventId) {
        return (participants[part].participantId, participants[part].eventId);
    }
}