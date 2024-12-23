// Recruter
import { Kafka } from "kafkajs";
import User from "../model/user.model.js";
import { consumeMessages } from "../services/kafka.service.js";

const kafka = new Kafka({
  clientId: "recruter-service",
  brokers: ["192.168.242.77:9092"],
});

const consumer = kafka.consumer({ groupId: "recruter-group" });

export const startConsumer = async () => {
  await consumeMessages(); // Start consuming messages
};
