import 'package:flutter_test/flutter_test.dart';
import 'package:zimid_frontend/main.dart';

void main() {
  testWidgets('renders wallet and services tabs', (tester) async {
    await tester.pumpWidget(const ZimIdApp());

    expect(find.text('ZimID Wallet'), findsOneWidget);
    expect(find.text('Wallet'), findsOneWidget);
    expect(find.text('Services'), findsOneWidget);
  });
}
