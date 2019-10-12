const functions = require('firebase-functions');
const admin = require('firebase-admin');

exports.issueCreateWithStatus = functions.firestore
  .document('room/{roomId}/issues/{issueId}')
  .onCreate(snapshot => {
    const { status } = snapshot.data();

    if (status !== 'pending') {
      return snapshot.ref.update({
        status: 'pending'
      });
    }

    return null;
  });

exports.issueCreateCreatedAt = functions.firestore
  .document('room/{roomId}/issues/{issueId}')
  .onCreate(snapshot => {

    return snapshot.ref.update({
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

exports.issueValidStatusUpdate = functions.firestore
  .document('room/{roomId}/issues/{issueId}')
  .onWrite(changed => {
    const { status: statusBefore } = changed.before.data();
    const { status: statusAfter } = changed.after.data();

    if (statusBefore !== statusAfter) {
      let status = statusBefore;
      switch (statusBefore) {
        case 'pending':
          status = (statusAfter !== 'delete') ? 'active' : 'delete';
          break;
        case 'active':
          status = 'inactive';
          break;
      }

      return change.after.ref.update({
        status
      });
    }

    return null;
  });

exports.issueRequireName = functions.firestore
  .document('room/{roomId}/issues/{issueId}')
  .onWrite(changed => {
    const { name } = changed.after.data();

    if (!name) {
      const date = new Date();
      return change.after.ref.update({
        name: `Issue from ${date.toGMTString()}`
      });
    }

    return null;
  });

exports.bidSetBidder = functions.firestore
  .document('room/{roomId}/issues/{issueId}/bids/{bidId}')
  .onCreate(async snapshot => {
    // For reference: https://github.com/firebase/firebase-functions/issues/300#issuecomment-488418509
    const user = await admin.auth().getUser(uid);
    const bidderName = user.displayName || 'no name';

    return snapshot.ref.update({
      bidderName
    });
  });

exports.bidRequiresMembership = functions.firestore
  .document('room/{roomId}/issues/{issueId}/bids/{bidId}')
  .onCreate(async snapshot => {
    // TODO: must be member of room to bid
  });

exports.bidOnePerUser = functions.firestore
  .document('room/{roomId}/issues/{issueId}/bids/{bidId}')
  .onCreate(async snapshot => {
    // TODO: new bid should replace old (wach for loop trap)
  });
