var apiKey;
var sessionId;
var token;

function handleError(error) {
  if (error) {
    console.error(error);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);
  console.log(apiKey);
  console.log(sessionId);
  console.log(token);

  // Subscribe to a newly created stream
  session.on("streamCreated", function streamCreated(event) {
    var subscriberOptions = {
      insertMode: "append",
      width: "100%",
      height: "100%"
    };
    session.subscribe(
      event.stream,
      "subscriber",
      subscriberOptions,
      handleError
    );
  });

  session.on("sessionDisconnected", function sessionDisconnected(event) {
    console.log("You were disconnected from the session.", event.reason);
  });

  var publisherOptions = {
    insertMode: "append",
    width: "100%",
    height: "100%"
  };
  var publisher = OT.initPublisher("publisher", publisherOptions, handleError);

  // Connect to the session
  session.connect(token, function callback(error) {
    if (error) {
      handleError(error);
    } else {
      // If the connection is successful, initialize a publisher and publish to the session
      session.publish(publisher, handleError);
    }
  });
}

// See the config.js file.
if (API_KEY && TOKEN && SESSION_ID) {
  apiKey = API_KEY;
  sessionId = SESSION_ID;
  token = TOKEN;
  initializeSession();
} else if (SAMPLE_SERVER_BASE_URL) {
  // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
  fetch(SAMPLE_SERVER_BASE_URL + "/room/Lucy")
    .then(function fetch(res) {
      return res.json();
    })
    .then(function fetchJson(json) {
      apiKey = json.apiKey;
      //sessionId = json.sessionId;
      //token = json.token;
    sessionid= "2_MX40NjA2NzQ4Mn5-MTUxOTc0MzcxMzIxMH5kdER1cVVOUXlpUGNSWDBsZmg2QXNqSS9-UH4";
    token = "T1==cGFydG5lcl9pZD00NjA2NzQ4MiZzaWc9Y2MwZTA0NWNlZGMyODU5ZDQ3NThlNDU5NzE2NDJmMTBhNTdkYzExZDpzZXNzaW9uX2lkPTJfTVg0ME5qQTJOelE0TW41LU1UVXhPVGMwTXpjeE16SXhNSDVrZEVSMWNWVk9VWGxwVUdOU1dEQnNabWcyUVhOcVNTOS1VSDQmY3JlYXRlX3RpbWU9MTUxOTc0NDIxMiZub25jZT0wLjAxODE0MjA4MDc3NzExODg3NCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUyMjMzMjYxMiZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

      initializeSession();
    })
    .catch(function catchErr(error) {
      handleError(error);
      alert(
        "Failed to get opentok sessionId and token. Make sure you have updated the config.js file."
      );
    });
}
