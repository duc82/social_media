CREATE OR REPLACE FUNCTION mark_messages_as_read(conversationId UUID, userId UUID)
RETURNS VOID AS $$
BEGIN
  -- Insert message_reads only if not already marked as read
  INSERT INTO message_reads ("messageId", "userId")
  SELECT m.id, userId
  FROM messages m
  LEFT JOIN message_reads mr
    ON mr."messageId" = m.id AND mr."userId" = userId
  WHERE m."conversationId" = conversationId
    AND mr."messageId" IS NULL;  -- not yet read
END;
$$ LANGUAGE plpgsql;