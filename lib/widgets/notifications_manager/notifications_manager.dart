import 'package:flutter/material.dart';
import 'package:zevent/widgets/notifications_manager/notifications/game_notification.dart';
import 'package:zevent/widgets/notifications_manager/notifications/stats_notification.dart';
import 'package:zevent/widgets/notifications_manager/notifications/streamer_game_notification.dart';
import 'package:zevent/widgets/notifications_manager/notifications/streamer_notification.dart';

class NotificationsManager {
  static List<String> notificationsNames = [
    "Streamer",
    "Jeu",
    "Streamer et jeu",
    // "Statistiques"
  ];

  static getBuilder(String notificationType, BuildContext context) {
    switch (notificationType) {
      case "Streamer":
        return StreamerNotification().build(context);
      case "Jeu":
        return GameNotifications().build(context);
      case "Streamer et jeu":
        return StreamerAndGameNotification().build(context);
      case "Statistiques":
        return StatsNotification().build(context);
      default:
    }
  }
}
