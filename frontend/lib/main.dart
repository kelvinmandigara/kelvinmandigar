import 'dart:math' as math;

import 'package:flutter/material.dart';

void main() {
  runApp(const ZimIdApp());
}

class ZimIdApp extends StatelessWidget {
  const ZimIdApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'ZimID',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: const Color(0xFF2C5EEA)),
        useMaterial3: true,
      ),
      home: const ZimIdHomePage(),
    );
  }
}

class ZimIdHomePage extends StatefulWidget {
  const ZimIdHomePage({super.key});

  @override
  State<ZimIdHomePage> createState() => _ZimIdHomePageState();
}

class _ZimIdHomePageState extends State<ZimIdHomePage>
    with SingleTickerProviderStateMixin {
  late final TabController _tabController;
  bool _showBack = false;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 2, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF3F6FF),
      appBar: AppBar(
        title: const Text('ZimID Wallet'),
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Wallet'),
            Tab(text: 'Services'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          ListView(
            padding: const EdgeInsets.all(16),
            children: [
              GestureDetector(
                onTap: () => setState(() => _showBack = !_showBack),
                child: AnimatedSwitcher(
                  duration: const Duration(milliseconds: 350),
                  transitionBuilder: (child, animation) => RotationYTransition(
                    turns: animation,
                    child: child,
                  ),
                  child: _showBack
                      ? const _IdCardBack(key: ValueKey('back'))
                      : const _IdCardFront(key: ValueKey('front')),
                ),
              ),
              const SizedBox(height: 16),
              const _WalletTray(),
              const SizedBox(height: 16),
              const _RegistrationCard(),
            ],
          ),
          const _ServicesDashboard(),
        ],
      ),
    );
  }
}

class RotationYTransition extends AnimatedWidget {
  const RotationYTransition({
    super.key,
    required Animation<double> turns,
    required this.child,
  }) : super(listenable: turns);

  Animation<double> get turns => listenable as Animation<double>;
  final Widget child;

  @override
  Widget build(BuildContext context) {
    final value = turns.value;
    final angle = value * math.pi;
    return Transform(
      alignment: Alignment.center,
      transform: Matrix4.identity()
        ..setEntry(3, 2, 0.001)
        ..rotateY(angle),
      child: child,
    );
  }
}

class _IdCardFront extends StatelessWidget {
  const _IdCardFront({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 215,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        gradient: const LinearGradient(
          colors: [Color(0xFF17358E), Color(0xFF2D6BFF)],
        ),
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Republic of Zimbabwe', style: TextStyle(color: Colors.white70)),
          Spacer(),
          Text('TINASHE MOYO',
              style: TextStyle(color: Colors.white, fontSize: 24, fontWeight: FontWeight.w700)),
          Text('ID: 63-123456-A-12', style: TextStyle(color: Colors.white70)),
        ],
      ),
    );
  }
}

class _IdCardBack extends StatelessWidget {
  const _IdCardBack({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 215,
      padding: const EdgeInsets.all(18),
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(16),
        color: Colors.black87,
      ),
      child: const Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(height: 24),
          Text('Date of Birth: 1999-01-01', style: TextStyle(color: Colors.white)),
          SizedBox(height: 8),
          Text('Tap card to flip', style: TextStyle(color: Colors.white70)),
        ],
      ),
    );
  }
}

class _WalletTray extends StatelessWidget {
  const _WalletTray();

  @override
  Widget build(BuildContext context) {
    const items = ['Digital ID', 'Passport', 'Driver\'s License', 'Birth Certificate'];
    return SizedBox(
      height: 74,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: items.length,
        separatorBuilder: (_, __) => const SizedBox(width: 12),
        itemBuilder: (_, index) => AnimatedContainer(
          duration: const Duration(milliseconds: 300),
          padding: const EdgeInsets.symmetric(horizontal: 16),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(14),
            color: Colors.white,
            boxShadow: const [
              BoxShadow(color: Color(0x22000000), blurRadius: 12, offset: Offset(0, 5))
            ],
          ),
          child: Center(
            child: Text(items[index], style: const TextStyle(fontWeight: FontWeight.w600)),
          ),
        ),
      ),
    );
  }
}

class _RegistrationCard extends StatelessWidget {
  const _RegistrationCard();

  @override
  Widget build(BuildContext context) {
    return Card(
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      child: const Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text('Citizen Registration', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 12),
            _Field(label: 'Name'),
            _Field(label: 'Surname'),
            _Field(label: 'Date of Birth'),
            _Field(label: 'ID Number'),
            _Field(label: 'Photo Upload'),
          ],
        ),
      ),
    );
  }
}

class _Field extends StatelessWidget {
  const _Field({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 10),
      child: TextFormField(
        decoration: InputDecoration(
          labelText: label,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }
}

class _ServicesDashboard extends StatelessWidget {
  const _ServicesDashboard();

  @override
  Widget build(BuildContext context) {
    final services = [
      ('Passport Application', Icons.book_online),
      ('Birth Certificate', Icons.description_outlined),
      ('Driver’s License', Icons.directions_car_filled_outlined),
    ];

    return Padding(
      padding: const EdgeInsets.all(16),
      child: GridView.builder(
        itemCount: services.length,
        gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
          crossAxisCount: 1,
          mainAxisSpacing: 12,
          childAspectRatio: 3.2,
        ),
        itemBuilder: (_, index) {
          final (name, icon) = services[index];
          return Card(
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
            child: ListTile(
              leading: CircleAvatar(child: Icon(icon)),
              title: Text(name),
              subtitle: const Text('Open module'),
              trailing: const Icon(Icons.arrow_forward_ios_rounded, size: 16),
            ),
          );
        },
      ),
    );
  }
}
